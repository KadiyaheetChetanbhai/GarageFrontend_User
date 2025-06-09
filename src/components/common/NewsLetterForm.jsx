import React, { useState } from "react";
import { showSuccessToast } from "../../utils/toast";
import { useSubmitSubscriptionMutation } from "../../redux/api/newsLetterApi";

export default function NewsLetterForm() {
  const [email, setEmail] = useState("");
  const [submitSubscription, { isLoading }] = useSubmitSubscriptionMutation();

  async function handleSubmit(e) {
    e.preventDefault();
    if (email.trim() === "") return;

    try {
      const result = await submitSubscription({ email: email.trim() }).unwrap();
      setEmail("");
      showSuccessToast(result.message);
    } catch (error) {}
  }

  return (
    <form
      className="flex flex-col md:flex-row gap-4 md:gap-3 font-medium text-sm"
      onSubmit={handleSubmit}
    >
      <input
        type="email"
        placeholder="Enter your Email"
        className="w-full md:w-80 lg:w-[508px] px-7 py-3 border border-[#99A2A5] rounded-lg placeholder-black text-sm"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <button
        type="submit"
        disabled={isLoading}
        className="w-[160px] md:w-auto mx-auto  bg-primary-dark text-white py-3 px-7 rounded-lg whitespace-nowrap disabled:opacity-70"
      >
        {isLoading ? "Subscribing..." : "Subscribe Now"}
      </button>
    </form>
  );
}
