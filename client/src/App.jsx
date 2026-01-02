import { useState, useEffect } from 'react'
import api from "../src/axiosConfig"

function App() {
  const [error, setError] = useState('')
  const [contacts, setContacts] = useState([])
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  })

  const fetchContacts = async () => {
    try {
      const response = await api.get('/contact')
      setContacts(response.data)
    } catch (err) {
      console.error(err)
    }
  }

  useEffect(() => {
    fetchContacts()
  }, [])

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const onSubmit = async (e) => {
    e.preventDefault()
    setError('')

    if (!formData.name || !formData.email || !formData.phone) {
      setError('Name, Email, and Phone are required')
      return
    }

    try {
      const res = await api.post('/contact', formData)
      setContacts([res.data, ...contacts])
      setFormData({ name: '', email: '', phone: '', message: '' })
    } catch (err) {
      setError(err.response?.data?.message || 'Error adding contact')
    }
  }

  // 4. Delete Contact (DELETE) - The Bonus
  const onDelete = async (id) => {
    if(!window.confirm("Are you sure?")) return;
    
    try {
      await api.delete(`/contact/${id}`)
      setContacts(contacts.filter((contact) => contact._id !== id))
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-indigo-50 via-purple-50 to-pink-50 p-4 flex flex-col items-center">
      <div className="max-w-4xl w-full">
        <h1 className="text-5xl font-bold mb-2 text-transparent bg-clip-text bg-linear-to-r from-indigo-600 to-purple-600 text-center">
          Contact Manager
        </h1>
        <p className="text-gray-600 text-center mb-10">Keep your connections organized and accessible</p>

        <div className="bg-white p-8 rounded-2xl shadow-2xl border border-gray-100 mb-6 backdrop-blur-lg bg-opacity-90">
          <h2 className="text-2xl font-semibold mb-6 text-gray-800">Add New Contact</h2>
          {error && (
            <div className="bg-red-50 border-l-4 border-red-400 text-red-700 p-4 mb-4 rounded">
              {error}
            </div>
          )}
          
          <div className="flex flex-col gap-2">
            <input
              type="text"
              name="name"
              placeholder="Full Name *"
              value={formData.name}
              onChange={onChange}
              className="border-2 border-gray-200 p-3 rounded-xl focus:border-indigo-400 focus:outline-none transition-all"
            />
            <input
              type="email"
              name="email"
              placeholder="Email Address *"
              value={formData.email}
              onChange={onChange}
              className="border-2 border-gray-200 p-3 rounded-xl focus:border-indigo-400 focus:outline-none transition-all"
            />
            <input
              type="text"
              name="phone"
              placeholder="Phone Number *"
              value={formData.phone}
              onChange={onChange}
              className="border-2 border-gray-200 p-3 rounded-xl focus:border-indigo-400 focus:outline-none transition-all"
            />
            <textarea
              name="message"
              placeholder="Add a note (Optional)"
              value={formData.message}
              onChange={onChange}
              rows="3"
              className="border-2 border-gray-200 p-3 rounded-xl focus:border-indigo-400 focus:outline-none transition-all resize-none"
            ></textarea>
            
            <button 
              onClick={onSubmit}
              disabled={!formData.name || !formData.email || !formData.phone}
              className="bg-linear-to-r from-indigo-500 to-purple-600 text-white p-4 rounded-xl hover:from-indigo-600 hover:to-purple-700 disabled:from-gray-300 disabled:to-gray-400 font-semibold shadow-lg hover:shadow-xl transition-all transform hover:scale-105 disabled:transform-none disabled:cursor-not-allowed"
            >
              Add Contact
            </button>
          </div>
        </div>

        <div className="w-full">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-2xl font-semibold text-gray-800">
              Your Contacts
            </h2>
            <span className="bg-indigo-100 text-indigo-700 px-4 py-2 rounded-full font-semibold text-sm">
              {contacts.length} {contacts.length === 1 ? 'Contact' : 'Contacts'}
            </span>
          </div>
          
          <div className="grid gap-4">
            {contacts.map((contact) => (
              <div 
                key={contact._id} 
                className="bg-white p-6 rounded-2xl shadow-md hover:shadow-xl transition-all border border-gray-100 flex justify-between items-start group"
              >
                <div className="flex-1">
                  <h3 className="font-bold text-xl text-gray-800 mb-2">{contact.name}</h3>
                  <div className="flex flex-wrap gap-3 text-sm text-gray-600 mb-2">
                    <span className="flex items-center gap-1">
                      <span className="text-indigo-500">✉</span> {contact.email}
                    </span>
                    <span className="flex items-center gap-1">
                      <span className="text-purple-500">📞</span> {contact.phone}
                    </span>
                  </div>
                  {contact.message && (
                    <p className="text-gray-500 text-sm mt-3 italic bg-gray-50 p-3 rounded-lg border-l-4 border-indigo-300">
                      "{contact.message}"
                    </p>
                  )}
                </div>
                <button 
                  onClick={() => onDelete(contact._id)}
                  className="text-red-400 hover:text-red-600 hover:bg-red-50 px-4 py-2 rounded-lg font-semibold text-sm transition-all ml-4"
                >
                  Delete
                </button>
              </div>
            ))}
            {contacts.length === 0 && (
              <div className="text-center py-16 bg-white rounded-2xl border-2 border-dashed border-gray-200">
                <p className="text-gray-400 text-lg">No contacts yet. Add your first contact above! 👆</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default App