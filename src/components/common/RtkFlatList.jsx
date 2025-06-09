import { useEffect, useRef } from "react";
import { RingLoader } from "../../components/common/RingLoader";
import { useGetOnlineStatus } from "../../hooks/useGetOnlineStatus";

export default function RtkFlatList({
  onIntersect,
  isFetching,
  listData,
  renderItem = () => {},
  hasNextPage,
  className,
  isError,
  isFetchingNextPage,
  hasNextMessage,
  noDataMessage,
  initialLoader = <RingLoader containerHeight={100} size={50} />,
}) {
  const observerRef = useRef(null);
  const observerInstance = useRef(null);
  const isOnline = useGetOnlineStatus(onIntersect); // Check online status

  useEffect(() => {
    if (!hasNextPage || isFetching || !isOnline) {
      observerInstance.current?.disconnect();
      return;
    }

    observerInstance.current = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          onIntersect();
        }
      },
      { rootMargin: "100px" } // Adjust if needed
    );

    if (observerRef.current) {
      observerInstance.current.observe(observerRef.current);
    }

    return () => {
      observerInstance.current?.disconnect();
    };
  }, [onIntersect, isFetching, hasNextPage, isError, isOnline]);

  if (isFetching && !isFetchingNextPage) return initialLoader;

  if (!listData?.length && noDataMessage) {
    return (
      <div className="flex justify-center items-center w-full">
        <div className="mx-auto my-2.5 min-h-10 max-w-max bg-gray-100 px-4 py-2 rounded-md text-gray-500 font-medium">
          {noDataMessage}
        </div>
      </div>
    );
  }

  // Extract the grid classes but keep the rounded classes in the container
  const classWithoutRounded = (className || "").replace(/rounded[^\s]*/g, "");

  return (
    <div className="w-full rounded-t-3xl relative">
      {/* Gray horizontal line at top */}
      {/* <div className="sm:hidden w-16 h-1 bg-gray-300 mx-auto mt-3 mb-2 rounded-full"></div> */}

      {/* Apply all classes except the rounded class */}
      <div className={classWithoutRounded}>
        {listData?.map((data, index, list) => renderItem?.(data, index, list))}
      </div>
      <div ref={observerRef} className="h-2.5 w-full"></div>
      {!isOnline && (
        <p className="text-center text-orange-500 my-2">
          You are offline. Auto-loading disabled.
        </p>
      )}
      {isFetching ? (
        <RingLoader containerHeight={100} size={50} />
      ) : isError ? (
        <button
          onClick={onIntersect}
          disabled={isFetching}
          className="load-more-btn mx-auto my-2.5 max-w-max block"
        >
          {isError
            ? "Try Again"
            : isFetching
            ? "Loading more..."
            : hasNextPage
            ? "Load More"
            : "Nothing more to load"}
        </button>
      ) : (
        !hasNextPage && hasNextMessage && (
          <div className="flex justify-center items-center w-full">
            <div
              className="mx-auto my-2.5 min-h-10 max-w-max bg-gray-100 px-4 py-2 rounded-md text-gray-500 font-medium"
              disabled={true}
            >
              {hasNextMessage}
            </div>
          </div>
        )
      )}
    </div>
  );
}
