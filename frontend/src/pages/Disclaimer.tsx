import React from "react";
import { Link } from "react-router-dom";

const Disclaimer: React.FC = () => {
  return (
    <div className="max-w-5xl mx-auto px-4 py-10 text-gray-800">
      <h1 className="text-3xl font-bold mb-6 text-center">Disclaimer</h1>

      <p className="mb-4">
        SharkFund is a private, community-driven platform that operates on a system-based peer-to-peer support model. It is not affiliated
        with any government body, registered financial institution, or regulatory authority.
      </p>

      <p className="mb-4">
        This platform is accessible by invitation only and is intended for individuals who understand and accept the voluntary nature of
        participation. SharkFund does not provide investment advice, solicit funds for investment purposes, or guarantee any fixed or
        risk-free income.
      </p>

      <p className="mb-4">
        All payouts are based on the internal structure and community activity. Any illustrations, sample returns, or performance examples
        are merely indicative and do not promise future results. Members join at their own discretion and are responsible for evaluating
        the risks involved.
      </p>

      <p className="mb-4">
        SharkFund will not be held liable for any loss of data, delays, missed payouts, or interruptions caused by technical issues, user
        mistakes, or force majeure situations.
      </p>

      <p className="mb-4">
        The use of this website and platform signifies that the user understands and accepts all associated risks. Users are solely
        responsible for ensuring the correctness of their personal and financial details.
      </p>

      <p className="mb-4">
        Any misuse, attempt to manipulate the system, or act of fraud will result in immediate termination of access and potential legal
        consequences.
      </p>

      <p className="text-sm text-gray-500 text-center mt-8">
        Last updated: {new Date().toLocaleDateString("en-IN", { year: "numeric", month: "long", day: "numeric" })}
      </p>

      <div className="flex justify-center mt-8">
        <Link
          to="/"
          className="bg-black text-white px-6 py-2 rounded-lg shadow hover:bg-gray-700 transition"
        >
          ← Back to Home
        </Link>
      </div>
    </div>
  );
};

export default Disclaimer;
