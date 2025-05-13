import React from "react";
import { Link } from "react-router-dom";

const Terms: React.FC = () => {
  return (
    <div className="max-w-5xl mx-auto px-4 py-10 text-gray-800">
      <h1 className="text-3xl font-bold mb-6 text-center">Terms & Conditions</h1>

      <div className="space-y-6">
        <p>
          Welcome to SharkFund. By accessing or using this platform, you agree to abide by the following Terms & Conditions. These terms govern your relationship with SharkFund, its administrators, and the community. If you do not agree with these terms, please do not use the platform.
        </p>

        <h2 className="text-xl font-semibold">1. Platform Nature & Purpose</h2>
        <p>
          SharkFund operates as a community-driven crowdfunding platform. It is not a financial institution, investment scheme, or trading platform. SharkFund is built on peer-to-peer voluntary contributions, where users participate in a system-based distribution model.
        </p>

        <h2 className="text-xl font-semibold">2. User Eligibility</h2>
        <p>
          Users must be at least 18 years old and legally eligible to enter into agreements as per the applicable laws of their country. By registering, users confirm that all personal information provided is accurate and up-to-date.
        </p>

        <h2 className="text-xl font-semibold">3. Contribution Policy</h2>
        <p>
          Users join SharkFund by contributing a fixed amount of ₹1000. This contribution is used to support the community model and is strictly non-refundable. Contributions are voluntary, and users understand that this is not an investment or deposit.
        </p>

        <h2 className="text-xl font-semibold">4. System-Based Payouts</h2>
        <p>
          All payouts made through SharkFund are based on the system's performance, activity levels, and user engagement. SharkFund does not guarantee fixed returns, profits, or income of any kind. The platform merely facilitates peer-based support within the network.
        </p>

        <h2 className="text-xl font-semibold">5. System Load & Technical Interruptions</h2>
        <p>
          In the event of system overload, maintenance, server failure, or a slowdown in community activity, SharkFund reserves the right to pause, delay, or reschedule payouts without prior notice. Users agree not to hold SharkFund liable for such disruptions.
        </p>

        <h2 className="text-xl font-semibold">6. Exit & Refund Clause</h2>
        <p>
          Users may exit the system at any time by ceasing their participation. However, no refunds will be issued for the initial contribution. Exiting users also forfeit any remaining or pending payouts or referral bonuses.
        </p>

        <h2 className="text-xl font-semibold">7. Referral Bonus & KYC Verification</h2>
        <p>
          Referral bonuses are provided to users who invite others to join the platform using their referral code. These bonuses are subject to successful KYC verification of the new users. SharkFund reserves the right to delay or withhold referral bonuses in cases of suspected misuse, fraud, or system manipulation.
        </p>

        <h2 className="text-xl font-semibold">8. Account Termination</h2>
        <p>
          SharkFund reserves the right to suspend or terminate user accounts in cases of suspicious activity, misinformation, or violation of community guidelines. Terminated users will not be eligible for future participation or payouts.
        </p>

        <h2 className="text-xl font-semibold">9. Intellectual Property</h2>
        <p>
          All content, branding, code, and platform structure are the intellectual property of SharkFund. No user is permitted to reproduce, copy, or use platform materials without explicit written permission.
        </p>

        <h2 className="text-xl font-semibold">10. Amendments to Terms</h2>
        <p>
          SharkFund may update or modify these Terms & Conditions at any time. Continued use of the platform after such changes constitutes agreement to the new terms. Users are encouraged to review this page periodically.
        </p>

        <h2 className="text-xl font-semibold">11. Legal Jurisdiction</h2>
        <p>
          Any disputes arising from the use of SharkFund will be subject to the jurisdiction of the appropriate courts in the location of SharkFund’s operational headquarters.
        </p>

        <p className="mt-6 text-sm text-gray-500 text-center">
          Last updated: {new Date().toLocaleDateString("en-IN", { year: 'numeric', month: 'long', day: 'numeric' })}
        </p>
      </div>
      <div className="flex justify-center mt-10">
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

export default Terms;
