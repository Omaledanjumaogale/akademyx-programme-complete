"use client"

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { motion } from "@/components/motion-wrapper"
import { 
  Building2, 
  User, 
  Users, 
  Banknote, 
  Percent,
  School,
  UserCircle,
  Mail,
  Phone,
  MapPin,
  Star
} from "lucide-react"

export default function ReferralSection() {
  const [activeTab, setActiveTab] = useState<'institution' | 'individual'>('institution')
  const [institutionForm, setInstitutionForm] = useState({
    institutionName: '',
    presidentName: '',
    presidentEmail: '',
    presidentPhone: '',
    institutionAddress: '',
    ninNumber: '',
    stateOfResident: '',
    stateOfOrigin: '',
    password: '',
    confirmPassword: '',
    bankName: '',
    accountNumber: '',
    accountName: ''
  })
  
  const [individualForm, setIndividualForm] = useState({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    ninNumber: '',
    stateOfResident: '',
    stateOfOrigin: '',
    password: '',
    confirmPassword: '',
    bankName: '',
    accountNumber: '',
    accountName: ''
  })

  const handleInstitutionSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    // Validate NIN number
    if (institutionForm.ninNumber.length !== 11) {
      alert('NIN number must be exactly 11 digits')
      return
    }
    
    // Validate password
    if (institutionForm.password.length < 8) {
      alert('Password must be at least 8 characters long')
      return
    }
    
    // Validate password match
    if (institutionForm.password !== institutionForm.confirmPassword) {
      alert('Passwords do not match')
      return
    }
    
    // Create submission data (excluding password for security)
    const submissionData = {
      ...institutionForm,
      password: undefined,
      confirmPassword: undefined
    }
    
    console.log('Institution referral submitted:', submissionData)
    // Handle form submission logic here
  }

  const handleIndividualSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    // Validate NIN number
    if (individualForm.ninNumber.length !== 11) {
      alert('NIN number must be exactly 11 digits')
      return
    }
    
    // Validate password
    if (individualForm.password.length < 8) {
      alert('Password must be at least 8 characters long')
      return
    }
    
    // Validate password match
    if (individualForm.password !== individualForm.confirmPassword) {
      alert('Passwords do not match')
      return
    }
    
    // Create submission data (excluding password for security)
    const submissionData = {
      ...individualForm,
      password: undefined,
      confirmPassword: undefined
    }
    
    console.log('Individual referral submitted:', submissionData)
    // Handle form submission logic here
  }

  return (
    <section className="py-20 md:py-32 bg-gradient-to-br from-purple-50 to-indigo-50">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center gap-2 mb-4">
            <Star className="w-8 h-8 text-yellow-500" />
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900">
              Earn While You Empower Others
            </h2>
            <Star className="w-8 h-8 text-yellow-500" />
          </div>
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
            Join our referral program and earn 25% commission for every participant you onboard to the Akademyx Masterclass Programme. Choose your referral type below:
          </p>
        </motion.div>

        {/* Tab Navigation */}
        <div className="flex justify-center mb-12">
          <div className="bg-white rounded-2xl p-2 shadow-lg">
            <div className="flex gap-2">
              <Button
                variant={activeTab === 'institution' ? 'default' : 'ghost'}
                size="lg"
                className={`rounded-xl px-6 ${activeTab === 'institution' ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white' : 'text-gray-600'}`}
                onClick={() => setActiveTab('institution')}
              >
                <Building2 className="w-5 h-5 mr-2" />
                Institution Referral
              </Button>
              <Button
                variant={activeTab === 'individual' ? 'default' : 'ghost'}
                size="lg"
                className={`rounded-xl px-6 ${activeTab === 'individual' ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white' : 'text-gray-600'}`}
                onClick={() => setActiveTab('individual')}
              >
                <User className="w-5 h-5 mr-2" />
                Individual Referral
              </Button>
            </div>
          </div>
        </div>

        {/* Commission Structure Banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <Card className="bg-gradient-to-r from-yellow-400 to-orange-500 border-0">
            <CardContent className="p-8 text-center text-white">
              <div className="flex items-center justify-center gap-3 mb-4">
                <Percent className="w-8 h-8" />
                <h3 className="text-2xl md:text-3xl font-bold">25% Commission Structure</h3>
                <Percent className="w-8 h-8" />
              </div>
              <p className="text-lg md:text-xl opacity-90 max-w-2xl mx-auto">
                Earn <strong>â‚¦750</strong> for every participant who registers through your referral link. 
                That's 25% of the â‚¦3,000 course fee paid directly to your account!
              </p>
            </CardContent>
          </Card>
        </motion.div>

        {/* Referral Forms */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {activeTab === 'institution' ? (
            <Card className="max-w-4xl mx-auto">
              <CardHeader>
                <CardTitle className="text-2xl md:text-3xl font-bold text-center text-gray-900">
                  <div className="flex items-center justify-center gap-3 mb-2">
                    <School className="w-8 h-8 text-purple-600" />
                    <span>Institution Referral Registration</span>
                  </div>
                  <p className="text-base md:text-lg text-gray-600 font-normal">
                    Register your institution to onboard students through the Student Union President
                  </p>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleInstitutionSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="institutionName" className="flex items-center gap-2">
                        <Building2 className="w-4 h-4" />
                        Institution Name
                      </Label>
                      <Input
                        id="institutionName"
                        value={institutionForm.institutionName}
                        onChange={(e) => setInstitutionForm({...institutionForm, institutionName: e.target.value})}
                        placeholder="Enter your institution name"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="presidentName" className="flex items-center gap-2">
                        <UserCircle className="w-4 h-4" />
                        Student Union President Name
                      </Label>
                      <Input
                        id="presidentName"
                        value={institutionForm.presidentName}
                        onChange={(e) => setInstitutionForm({...institutionForm, presidentName: e.target.value})}
                        placeholder="Full name of the Student Union President"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="presidentEmail" className="flex items-center gap-2">
                        <Mail className="w-4 h-4" />
                        President's Email
                      </Label>
                      <Input
                        id="presidentEmail"
                        type="email"
                        value={institutionForm.presidentEmail}
                        onChange={(e) => setInstitutionForm({...institutionForm, presidentEmail: e.target.value})}
                        placeholder="president@institution.edu"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="presidentPhone" className="flex items-center gap-2">
                        <Phone className="w-4 h-4" />
                        President's Phone
                      </Label>
                      <Input
                        id="presidentPhone"
                        type="tel"
                        value={institutionForm.presidentPhone}
                        onChange={(e) => setInstitutionForm({...institutionForm, presidentPhone: e.target.value})}
                        placeholder="+234XXXXXXXXXX"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="institutionAddress" className="flex items-center gap-2">
                      <MapPin className="w-4 h-4" />
                      Institution Address
                    </Label>
                    <Input
                      id="institutionAddress"
                      value={institutionForm.institutionAddress}
                      onChange={(e) => setInstitutionForm({...institutionForm, institutionAddress: e.target.value})}
                      placeholder="Full address of your institution"
                      required
                    />
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="ninNumber" className="flex items-center gap-2">
                        <User className="w-4 h-4" />
                        NIN Number
                      </Label>
                      <Input
                        id="ninNumber"
                        value={institutionForm.ninNumber}
                        onChange={(e) => setInstitutionForm({...institutionForm, ninNumber: e.target.value})}
                        placeholder="11-digit National Identification Number"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="stateOfResident" className="flex items-center gap-2">
                        <MapPin className="w-4 h-4" />
                        State of Resident
                      </Label>
                      <Input
                        id="stateOfResident"
                        value={institutionForm.stateOfResident}
                        onChange={(e) => setInstitutionForm({...institutionForm, stateOfResident: e.target.value})}
                        placeholder="State where you currently reside"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="stateOfOrigin" className="flex items-center gap-2">
                        <MapPin className="w-4 h-4" />
                        State of Origin
                      </Label>
                      <Input
                        id="stateOfOrigin"
                        value={institutionForm.stateOfOrigin}
                        onChange={(e) => setInstitutionForm({...institutionForm, stateOfOrigin: e.target.value})}
                        placeholder="Your state of origin"
                        required
                      />
                    </div>
                    <div></div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="password" className="flex items-center gap-2">
                        <User className="w-4 h-4" />
                        Password
                      </Label>
                      <Input
                        id="password"
                        type="password"
                        value={institutionForm.password}
                        onChange={(e) => setInstitutionForm({...institutionForm, password: e.target.value})}
                        placeholder="Create a secure password"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="confirmPassword" className="flex items-center gap-2">
                        <User className="w-4 h-4" />
                        Confirm Password
                      </Label>
                      <Input
                        id="confirmPassword"
                        type="password"
                        value={institutionForm.confirmPassword}
                        onChange={(e) => setInstitutionForm({...institutionForm, confirmPassword: e.target.value})}
                        placeholder="Confirm your password"
                        required
                      />
                    </div>
                  </div>

                  <div className="border-t pt-6">
                    <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                      <Banknote className="w-5 h-5" />
                      Banking Details for Commission Payments
                    </h4>
                    <div className="grid md:grid-cols-3 gap-4">
                      <div>
                        <Label htmlFor="bankName">Bank Name</Label>
                        <Input
                          id="bankName"
                          value={institutionForm.bankName}
                          onChange={(e) => setInstitutionForm({...institutionForm, bankName: e.target.value})}
                          placeholder="First Bank, GTBank, etc."
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="accountNumber">Account Number</Label>
                        <Input
                          id="accountNumber"
                          value={institutionForm.accountNumber}
                          onChange={(e) => setInstitutionForm({...institutionForm, accountNumber: e.target.value})}
                          placeholder="10 digit account number"
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="accountName">Account Name</Label>
                        <Input
                          id="accountName"
                          value={institutionForm.accountName}
                          onChange={(e) => setInstitutionForm({...institutionForm, accountName: e.target.value})}
                          placeholder="Name on the account"
                          required
                        />
                      </div>
                    </div>
                  </div>

                  <Button 
                    type="submit" 
                    className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-bold py-3 rounded-xl"
                  >
                    Register Institution & Get Referral Link
                  </Button>
                </form>
              </CardContent>
            </Card>
          ) : (
            <Card className="max-w-4xl mx-auto">
              <CardHeader>
                <CardTitle className="text-2xl md:text-3xl font-bold text-center text-gray-900">
                  <div className="flex items-center justify-center gap-3 mb-2">
                    <User className="w-8 h-8 text-purple-600" />
                    <span>Individual Referral Registration</span>
                  </div>
                  <p className="text-base md:text-lg text-gray-600 font-normal">
                    Register to onboard friends and family directly into your downline
                  </p>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleIndividualSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="fullName" className="flex items-center gap-2">
                        <UserCircle className="w-4 h-4" />
                        Full Name
                      </Label>
                      <Input
                        id="fullName"
                        value={individualForm.fullName}
                        onChange={(e) => setIndividualForm({...individualForm, fullName: e.target.value})}
                        placeholder="Your full name"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="email" className="flex items-center gap-2">
                        <Mail className="w-4 h-4" />
                        Email Address
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        value={individualForm.email}
                        onChange={(e) => setIndividualForm({...individualForm, email: e.target.value})}
                        placeholder="your@email.com"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="phone" className="flex items-center gap-2">
                        <Phone className="w-4 h-4" />
                        Phone Number
                      </Label>
                      <Input
                        id="phone"
                        type="tel"
                        value={individualForm.phone}
                        onChange={(e) => setIndividualForm({...individualForm, phone: e.target.value})}
                        placeholder="+234XXXXXXXXXX"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="address" className="flex items-center gap-2">
                        <MapPin className="w-4 h-4" />
                        Address
                      </Label>
                      <Input
                        id="address"
                        value={individualForm.address}
                        onChange={(e) => setIndividualForm({...individualForm, address: e.target.value})}
                        placeholder="Your residential address"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="individualNinNumber" className="flex items-center gap-2">
                        <User className="w-4 h-4" />
                        NIN Number
                      </Label>
                      <Input
                        id="individualNinNumber"
                        value={individualForm.ninNumber}
                        onChange={(e) => setIndividualForm({...individualForm, ninNumber: e.target.value})}
                        placeholder="11-digit National Identification Number"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="individualStateOfResident" className="flex items-center gap-2">
                        <MapPin className="w-4 h-4" />
                        State of Resident
                      </Label>
                      <Input
                        id="individualStateOfResident"
                        value={individualForm.stateOfResident}
                        onChange={(e) => setIndividualForm({...individualForm, stateOfResident: e.target.value})}
                        placeholder="State where you currently reside"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="individualStateOfOrigin" className="flex items-center gap-2">
                        <MapPin className="w-4 h-4" />
                        State of Origin
                      </Label>
                      <Input
                        id="individualStateOfOrigin"
                        value={individualForm.stateOfOrigin}
                        onChange={(e) => setIndividualForm({...individualForm, stateOfOrigin: e.target.value})}
                        placeholder="Your state of origin"
                        required
                      />
                    </div>
                    <div></div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="individualPassword" className="flex items-center gap-2">
                        <User className="w-4 h-4" />
                        Password
                      </Label>
                      <Input
                        id="individualPassword"
                        type="password"
                        value={individualForm.password}
                        onChange={(e) => setIndividualForm({...individualForm, password: e.target.value})}
                        placeholder="Create a secure password"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="individualConfirmPassword" className="flex items-center gap-2">
                        <User className="w-4 h-4" />
                        Confirm Password
                      </Label>
                      <Input
                        id="individualConfirmPassword"
                        type="password"
                        value={individualForm.confirmPassword}
                        onChange={(e) => setIndividualForm({...individualForm, confirmPassword: e.target.value})}
                        placeholder="Confirm your password"
                        required
                      />
                    </div>
                  </div>

                  <div className="border-t pt-6">
                    <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                      <Banknote className="w-5 h-5" />
                      Banking Details for Commission Payments
                    </h4>
                    <div className="grid md:grid-cols-3 gap-4">
                      <div>
                        <Label htmlFor="individualBankName">Bank Name</Label>
                        <Input
                          id="individualBankName"
                          value={individualForm.bankName}
                          onChange={(e) => setIndividualForm({...individualForm, bankName: e.target.value})}
                          placeholder="First Bank, GTBank, etc."
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="individualAccountNumber">Account Number</Label>
                        <Input
                          id="individualAccountNumber"
                          value={individualForm.accountNumber}
                          onChange={(e) => setIndividualForm({...individualForm, accountNumber: e.target.value})}
                          placeholder="10 digit account number"
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="individualAccountName">Account Name</Label>
                        <Input
                          id="individualAccountName"
                          value={individualForm.accountName}
                          onChange={(e) => setIndividualForm({...individualForm, accountName: e.target.value})}
                          placeholder="Name on the account"
                          required
                        />
                      </div>
                    </div>
                  </div>

                  <Button 
                    type="submit" 
                    className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-bold py-3 rounded-xl"
                  >
                    Register & Get Referral Link
                  </Button>
                </form>
              </CardContent>
            </Card>
          )}
        </motion.div>

        {/* How It Works */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mt-16 text-center"
        >
          <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8">How It Works</h3>
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-white">1</span>
              </div>
              <h4 className="text-lg font-semibold text-gray-900 mb-2">Register</h4>
              <p className="text-gray-600">Fill out the form above to register as a referral partner</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-white">2</span>
              </div>
              <h4 className="text-lg font-semibold text-gray-900 mb-2">Share</h4>
              <p className="text-gray-600">Get your unique referral link and share with your network</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-white">3</span>
              </div>
              <h4 className="text-lg font-semibold text-gray-900 mb-2">Earn</h4>
              <p className="text-gray-600">Receive â‚¦750 commission for each successful registration</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}