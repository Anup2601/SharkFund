import React, { useState } from 'react';
import toast from 'react-hot-toast';

// Support Page Component
export const Support: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'faq' | 'contact' | 'ticket'>('faq');
  const [expandedFaqs, setExpandedFaqs] = useState<number[]>([]);

  // Toggle FAQ expansion
  const toggleFaq = (index: number) => {
    if (expandedFaqs.includes(index)) {
      setExpandedFaqs(expandedFaqs.filter(item => item !== index));
    } else {
      setExpandedFaqs([...expandedFaqs, index]);
    }
  };

  // Sample FAQ data
  const faqs = [
    {
      question: "How do I deposit funds into my account?",
      answer: "You can deposit funds by navigating to Fund Area > Deposit in the sidebar. We support various payment methods including credit/debit cards, bank transfers, and cryptocurrency. All deposits are processed within 24 hours."
    },
    {
      question: "What are the withdrawal limits and processing times?",
      answer: "Withdrawal limits depend on your account level. Standard accounts can withdraw up to $5,000 per day. Processing times are typically 1-3 business days for bank transfers and 24 hours for crypto withdrawals."
    },
    {
      question: "How can I update my profile information?",
      answer: "You can update your profile by clicking on the Profile link in the sidebar. From there, click the 'Edit Profile' button to modify your personal information, including name, mobile number, and country."
    },
    {
      question: "I forgot my password. How can I reset it?",
      answer: "On the login page, click on 'Forgot Password'. Enter your registered email address, and we'll send you instructions to reset your password. For security reasons, the reset link is valid for 24 hours only."
    },
    {
      question: "How do I view my team structure and performance?",
      answer: "Your team structure and performance metrics can be viewed in the Team Area section. Navigate to Team Area in the sidebar and select the relevant subsection to view detailed information about your team."
    }
  ];

  // Form state for support ticket
  const [ticketForm, setTicketForm] = useState({
    subject: '',
    category: '',
    priority: 'medium',
    description: '',
    attachFile: null
  });

  // Handle ticket form changes
  const handleTicketChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setTicketForm({
      ...ticketForm,
      [name]: value
    });
  };

  // Handle file upload
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0];
    if (file) {
      // In a real app, you'd handle the file upload
      // console.log("File selected:", file.name);
    }
  };

  // Handle ticket submission
  const handleTicketSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // In a real app, you'd submit to your API here
    // console.log("Ticket submitted:", ticketForm);
    
    // Reset form after submission
    setTicketForm({
      subject: '',
      category: '',
      priority: 'medium',
      description: '',
      attachFile: null
    });
    
    // Show success message (in a real app)
    toast.success("Your support ticket has been submitted. We'll respond within 24 hours.");
  };

  return (
    <div className="p-6 bg-[#222831] min-h-screen">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-white">Support Center</h1>
        <p className="text-gray-400 mt-1">Get help with your account and services</p>
      </div>

      {/* Tab Navigation */}
      <div className="mb-8 border-b border-gray-700">
        <nav className="flex space-x-8">
          <button
            onClick={() => setActiveTab('faq')}
            className={`py-4 px-1 font-medium text-sm border-b-2 ${
              activeTab === 'faq'
                ? 'border-[#00ADB5] text-[#00FFF5]'
                : 'border-transparent text-gray-400 hover:text-gray-300'
            }`}
          >
            Frequently Asked Questions
          </button>
          <button
            onClick={() => setActiveTab('contact')}
            className={`py-4 px-1 font-medium text-sm border-b-2 ${
              activeTab === 'contact'
                ? 'border-[#00ADB5] text-[#00FFF5]'
                : 'border-transparent text-gray-400 hover:text-gray-300'
            }`}
          >
            Contact Information
          </button>
          <button
            onClick={() => setActiveTab('ticket')}
            className={`py-4 px-1 font-medium text-sm border-b-2 ${
              activeTab === 'ticket'
                ? 'border-[#00ADB5] text-[#00FFF5]'
                : 'border-transparent text-gray-400 hover:text-gray-300'
            }`}
          >
            Submit a Ticket
          </button>
        </nav>
      </div>

      {/* FAQ Tab Content */}
      {activeTab === 'faq' && (
        <div className="bg-[#393E46] rounded-xl shadow-lg overflow-hidden">
          <div className="p-6">
            <h2 className="text-xl font-bold text-[#00ADB5] mb-6">Frequently Asked Questions</h2>
            
            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <div key={index} className="bg-[#222831] rounded-lg overflow-hidden">
                  <button
                    className="w-full px-6 py-4 text-left flex justify-between items-center focus:outline-none"
                    onClick={() => toggleFaq(index)}
                  >
                    <span className="font-medium text-white">{faq.question}</span>
                    <svg
                      className={`w-5 h-5 text-[#00ADB5] transform transition-transform duration-200 ${expandedFaqs.includes(index) ? 'rotate-180' : ''}`}
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  
                  {expandedFaqs.includes(index) && (
                    <div className="px-6 pb-4">
                      <p className="text-gray-400">{faq.answer}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
            
            <div className="mt-8 p-4 bg-[#222831] rounded-lg border border-[#00ADB5] bg-opacity-50">
              <p className="text-center text-gray-300">
                Can't find what you're looking for? 
                <button 
                  onClick={() => setActiveTab('ticket')}
                  className="ml-2 text-[#00FFF5] hover:underline"
                >
                  Submit a support ticket
                </button>
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Contact Information Tab Content */}
      {activeTab === 'contact' && (
        <div className="bg-[#393E46] rounded-xl shadow-lg overflow-hidden">
          <div className="p-6">
            <h2 className="text-xl font-bold text-[#00ADB5] mb-6">Contact Information</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Email Support */}
              <div className="bg-[#222831] p-6 rounded-lg">
                <div className="flex items-center mb-4">
                  <div className="rounded-full bg-[#00ADB5] bg-opacity-20 p-3">
                    <svg className="w-6 h-6 text-[#00FFF5]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <h3 className="ml-4 text-lg font-medium text-white">Email Support</h3>
                </div>
                <p className="text-gray-400 mb-2">For general inquiries:</p>
                <p className="text-[#00FFF5] font-medium mb-4">support@example.com</p>
                <p className="text-gray-400 mb-2">For account issues:</p>
                <p className="text-[#00FFF5] font-medium">accounts@example.com</p>
                <p className="text-gray-400 mt-4 text-sm">We typically respond within 24 hours</p>
              </div>
              
              {/* Phone Support */}
              <div className="bg-[#222831] p-6 rounded-lg">
                <div className="flex items-center mb-4">
                  <div className="rounded-full bg-[#00ADB5] bg-opacity-20 p-3">
                    <svg className="w-6 h-6 text-[#00FFF5]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <h3 className="ml-4 text-lg font-medium text-white">Phone Support</h3>
                </div>
                <p className="text-gray-400 mb-2">International:</p>
                <p className="text-[#00FFF5] font-medium mb-4">+1 (555) 123-4567</p>
                <p className="text-gray-400 mb-2">Toll-free (US only):</p>
                <p className="text-[#00FFF5] font-medium">1-800-123-4567</p>
                <p className="text-gray-400 mt-4 text-sm">Available Monday-Friday, 9AM-6PM ET</p>
              </div>
              
              {/* Social Media */}
              <div className="bg-[#222831] p-6 rounded-lg">
                <div className="flex items-center mb-4">
                  <div className="rounded-full bg-[#00ADB5] bg-opacity-20 p-3">
                    <svg className="w-6 h-6 text-[#00FFF5]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 20l4-16m2 16l4-16M6 9h14M4 15h14" />
                    </svg>
                  </div>
                  <h3 className="ml-4 text-lg font-medium text-white">Connect With Us</h3>
                </div>
                <p className="text-gray-400 mb-4">Follow us on social media for updates and support</p>
                <div className="flex space-x-4">
                  <button className="p-2 bg-[#393E46] rounded-full hover:bg-[#00ADB5] transition-colors duration-300">
                    <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
                    </svg>
                  </button>
                  <button className="p-2 bg-[#393E46] rounded-full hover:bg-[#00ADB5] transition-colors duration-300">
                    <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                    </svg>
                  </button>
                  <button className="p-2 bg-[#393E46] rounded-full hover:bg-[#00ADB5] transition-colors duration-300">
                    <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" />
                    </svg>
                  </button>
                  <button className="p-2 bg-[#393E46] rounded-full hover:bg-[#00ADB5] transition-colors duration-300">
                    <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
            
            <div className="mt-8 p-6 bg-[#222831] rounded-lg border border-[#00ADB5] bg-opacity-50">
              <h3 className="text-lg font-medium text-white mb-4">Office Locations</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <h4 className="font-medium text-[#00FFF5] mb-2">New York</h4>
                  <p className="text-gray-400">123 Business Avenue<br />New York, NY 10001<br />United States</p>
                </div>
                <div>
                  <h4 className="font-medium text-[#00FFF5] mb-2">London</h4>
                  <p className="text-gray-400">456 Enterprise Road<br />London, EC1A 1BB<br />United Kingdom</p>
                </div>
                <div>
                  <h4 className="font-medium text-[#00FFF5] mb-2">Singapore</h4>
                  <p className="text-gray-400">789 Technology Park<br />Singapore, 018956<br />Singapore</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Submit a Ticket Tab Content */}
      {activeTab === 'ticket' && (
        <div className="bg-[#393E46] rounded-xl shadow-lg overflow-hidden">
          <div className="p-6">
            <h2 className="text-xl font-bold text-[#00ADB5] mb-6">Submit a Support Ticket</h2>
            
            <form onSubmit={handleTicketSubmit}>
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Subject */}
                  <div>
                    <label htmlFor="subject" className="block text-[#00FFF5] text-sm font-medium mb-2">
                      Subject
                    </label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      value={ticketForm.subject}
                      onChange={handleTicketChange}
                      className="w-full bg-[#222831] text-white px-4 py-3 rounded-lg border border-[#00ADB5] focus:outline-none focus:ring-2 focus:ring-[#00FFF5]"
                      placeholder="Brief description of your issue"
                      required
                    />
                  </div>
                  
                  {/* Category */}
                  <div>
                    <label htmlFor="category" className="block text-[#00FFF5] text-sm font-medium mb-2">
                      Category
                    </label>
                    <select
                      id="category"
                      name="category"
                      value={ticketForm.category}
                      onChange={handleTicketChange}
                      className="w-full bg-[#222831] text-white px-4 py-3 rounded-lg border border-[#00ADB5] focus:outline-none focus:ring-2 focus:ring-[#00FFF5]"
                      required
                    >
                      <option value="">Select a category</option>
                      <option value="account">Account Issues</option>
                      <option value="payments">Payments & Billing</option>
                      <option value="technical">Technical Support</option>
                      <option value="feature">Feature Request</option>
                      <option value="security">Security Concerns</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                  
                  {/* Priority */}
                  <div>
                    <label htmlFor="priority" className="block text-[#00FFF5] text-sm font-medium mb-2">
                      Priority
                    </label>
                    <select
                      id="priority"
                      name="priority"
                      value={ticketForm.priority}
                      onChange={handleTicketChange}
                      className="w-full bg-[#222831] text-white px-4 py-3 rounded-lg border border-[#00ADB5] focus:outline-none focus:ring-2 focus:ring-[#00FFF5]"
                      required
                    >
                      <option value="low">Low</option>
                      <option value="medium">Medium</option>
                      <option value="high">High</option>
                      <option value="urgent">Urgent</option>
                    </select>
                  </div>
                  
                  {/* Attachment */}
                  <div>
                    <label htmlFor="attachment" className="block text-[#00FFF5] text-sm font-medium mb-2">
                      Attachment (Optional)
                    </label>
                    <div className="flex">
                      <input
                        type="file"
                        id="attachment"
                        name="attachment"
                        onChange={handleFileChange}
                        className="hidden"
                      />
                      <label
                        htmlFor="attachment"
                        className="flex-1 flex items-center justify-center px-4 py-3 bg-[#222831] text-gray-400 rounded-lg border border-dashed border-[#00ADB5] cursor-pointer hover:bg-gray-800 transition-colors"
                      >
                        <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
                        </svg>
                        <span>Choose file or drop here</span>
                      </label>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">Max file size: 10MB (JPG, PNG, PDF)</p>
                  </div>
                </div>
                
                {/* Description */}
                <div>
                  <label htmlFor="description" className="block text-[#00FFF5] text-sm font-medium mb-2">
                    Description
                  </label>
                  <textarea
                    id="description"
                    name="description"
                    value={ticketForm.description}
                    onChange={handleTicketChange}
                    rows={6}
                    className="w-full bg-[#222831] text-white px-4 py-3 rounded-lg border border-[#00ADB5] focus:outline-none focus:ring-2 focus:ring-[#00FFF5]"
                    placeholder="Please provide detailed information about your issue"
                    required
                  ></textarea>
                </div>
                
                {/* Submit Button */}
                <div className="flex justify-end">
                  <button
                    type="submit"
                    className="bg-gradient-to-r from-[#00ADB5] to-[#00FFF5] hover:from-[#00899E] hover:to-[#00D8DC] text-[#222831] py-3 px-8 rounded-lg font-bold transition-all duration-300"
                  >
                    Submit Ticket
                  </button>
                </div>
              </div>
            </form>
            
            <div className="mt-8 p-4 bg-[#222831] rounded-lg">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <svg className="h-6 w-6 text-[#00FFF5]" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-white">Response Time</p>
                  <p className="text-xs text-gray-400">We usually respond to tickets within 24 hours. For urgent matters, please contact us by phone.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* Support Status Indicator */}
      <div className="mt-8 bg-[#222831] p-4 rounded-lg border border-[#00ADB5]">
        <div className="flex items-center">
          <div className="relative">
            <div className="h-3 w-3 bg-green-500 rounded-full"></div>
            <div className="h-3 w-3 bg-green-500 rounded-full absolute top-0 animate-ping"></div>
          </div>
          <p className="ml-3 text-sm text-gray-300">
            <span className="font-medium text-white">Support system status:</span> All systems operational
          </p>
          <div className="ml-auto">
            <span className="text-xs text-gray-400">Last updated: 15 minutes ago</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Support;