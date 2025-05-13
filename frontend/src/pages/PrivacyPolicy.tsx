import React from "react";
import { Link } from "react-router-dom";

const PrivacyPolicy: React.FC = () => {
  return (
    <div className="max-w-5xl mx-auto px-4 py-10 text-gray-800">
      <h1 className="text-3xl font-bold mb-6 text-center">Privacy Policy</h1>

      <p className="mb-4">
        SharkFund is committed to safeguarding your personal data and maintaining your trust. This Privacy Policy outlines how we collect,
        use, and protect your information.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">1. Information We Collect</h2>
      <p className="mb-4">
        When you register or interact with the SharkFund platform, we may collect the following data:
      </p>
      <ul className="list-disc pl-5 space-y-2 mb-4">
        <li>Full Name</li>
        <li>Contact Number</li>
        <li>UPI ID (for payout purposes)</li>
        <li>Referral Details (if applicable)</li>
      </ul>

      <h2 className="text-xl font-semibold mt-6 mb-2">2. Purpose of Data Collection</h2>
      <p className="mb-4">
        The data is used for internal operations, user verification (KYC), payout distribution, communication, and fraud prevention. We do
        not use this data for marketing or unsolicited outreach.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">3. Data Security</h2>
      <p className="mb-4">
        We take data privacy seriously and implement appropriate physical, electronic, and managerial procedures to protect the
        information we collect. Access is limited to authorized personnel only.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">4. Data Sharing & Selling</h2>
      <p className="mb-4">
        We do not sell, rent, or trade your personal data to third parties. Your information is never shared externally, except as required
        by law or in case of suspected fraud.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">5. User Rights</h2>
      <p className="mb-4">
        Users have the right to request access to their data, correct inaccurate information, or request deletion (subject to account
        closure). Contact our support team for any such requests.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">6. Cookie Usage</h2>
      <p className="mb-4">
        SharkFund may use basic cookies for session management and to improve user experience. No personal data is collected via cookies.
        Please refer to our <Link to="/cookie-policy" className="text-blue-600 underline">Cookie Policy</Link> for more details.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">7. Policy Updates</h2>
      <p className="mb-4">
        We reserve the right to update this privacy policy from time to time. Users will be notified on the website if significant changes
        are made.
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

export default PrivacyPolicy;
