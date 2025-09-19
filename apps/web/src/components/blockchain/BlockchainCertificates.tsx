'use client'

import { useState, useEffect, useCallback } from 'react'
import { Shield, Award, Download, Eye, CheckCircle, Clock, Hash, Link, Copy, QrCode } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

interface Certificate {
  id: string
  title: string
  description: string
  issuer: string
  recipient: string
  issueDate: Date
  expiryDate?: Date
  skills: string[]
  level: 'beginner' | 'intermediate' | 'advanced' | 'expert'
  blockchainHash: string
  transactionId: string
  blockNumber: number
  network: 'ethereum' | 'polygon' | 'bsc'
  verified: boolean
  nftTokenId?: string
  metadata: {
    image: string
    attributes: Array<{
      trait_type: string
      value: string | number
    }>
  }
}

interface BlockchainCertificatesProps {
  isOpen: boolean
  onClose: () => void
}

export function BlockchainCertificates({ isOpen, onClose }: BlockchainCertificatesProps) {
  const [certificates, setCertificates] = useState<Certificate[]>([])
  const [selectedCertificate, setSelectedCertificate] = useState<Certificate | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [isGenerating, setIsGenerating] = useState(false)
  const [walletConnected, setWalletConnected] = useState(false)
  const [walletAddress, setWalletAddress] = useState('')
  const [network, setNetwork] = useState<'ethereum' | 'polygon' | 'bsc'>('polygon')

  // Load certificates on mount
  useEffect(() => {
    if (isOpen) {
      loadCertificates()
    }
  }, [isOpen])

  const loadCertificates = useCallback(async () => {
    setIsLoading(true)
    try {
      const response = await fetch('/api/blockchain/certificates', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      })
      const data = await response.json()
      setCertificates(data.certificates || [])
    } catch (error) {
      console.error('Failed to load certificates:', error)
    } finally {
      setIsLoading(false)
    }
  }, [])

  const connectWallet = useCallback(async () => {
    try {
      if (typeof window !== 'undefined' && (window as any).ethereum) {
        const accounts = await (window as any).ethereum.request({
          method: 'eth_requestAccounts'
        })
        
        if (accounts.length > 0) {
          setWalletAddress(accounts[0])
          setWalletConnected(true)
          
          // Get network
          const chainId = await (window as any).ethereum.request({
            method: 'eth_chainId'
          })
          
          const networkMap: { [key: string]: 'ethereum' | 'polygon' | 'bsc' } = {
            '0x1': 'ethereum',
            '0x89': 'polygon',
            '0x38': 'bsc'
          }
          
          setNetwork(networkMap[chainId] || 'polygon')
        }
      } else {
        alert('MetaMask לא מותקן. אנא התקן MetaMask כדי להמשיך.')
      }
    } catch (error) {
      console.error('Failed to connect wallet:', error)
    }
  }, [])

  const generateCertificate = useCallback(async (moduleId: string, completionData: any) => {
    if (!walletConnected) {
      alert('אנא חבר את הארנק שלך תחילה')
      return
    }

    setIsGenerating(true)
    try {
      const response = await fetch('/api/blockchain/generate-certificate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({
          moduleId,
          completionData,
          walletAddress,
          network
        })
      })

      const data = await response.json()
      
      if (data.success) {
        // Add new certificate to list
        setCertificates(prev => [data.certificate, ...prev])
        setSelectedCertificate(data.certificate)
      }
    } catch (error) {
      console.error('Failed to generate certificate:', error)
    } finally {
      setIsGenerating(false)
    }
  }, [walletConnected, walletAddress, network])

  const verifyCertificate = useCallback(async (certificateId: string) => {
    try {
      const response = await fetch(`/api/blockchain/verify-certificate/${certificateId}`)
      const data = await response.json()
      
      if (data.verified) {
        // Update certificate verification status
        setCertificates(prev => prev.map(cert => 
          cert.id === certificateId ? { ...cert, verified: true } : cert
        ))
      }
    } catch (error) {
      console.error('Failed to verify certificate:', error)
    }
  }, [])

  const downloadCertificate = useCallback((certificate: Certificate) => {
    // Generate PDF certificate
    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d')
    
    canvas.width = 800
    canvas.height = 600
    
    if (ctx) {
      // Draw certificate background
      ctx.fillStyle = '#f8fafc'
      ctx.fillRect(0, 0, canvas.width, canvas.height)
      
      // Draw border
      ctx.strokeStyle = '#3b82f6'
      ctx.lineWidth = 4
      ctx.strokeRect(20, 20, canvas.width - 40, canvas.height - 40)
      
      // Draw title
      ctx.fillStyle = '#1e40af'
      ctx.font = 'bold 32px Arial'
      ctx.textAlign = 'center'
      ctx.fillText('תעודת השלמה', canvas.width / 2, 100)
      
      // Draw certificate details
      ctx.fillStyle = '#374151'
      ctx.font = '20px Arial'
      ctx.fillText(`מוענק ל: ${certificate.recipient}`, canvas.width / 2, 180)
      ctx.fillText(`על השלמת: ${certificate.title}`, canvas.width / 2, 220)
      ctx.fillText(`תאריך: ${certificate.issueDate.toLocaleDateString('he-IL')}`, canvas.width / 2, 260)
      
      // Draw blockchain info
      ctx.font = '14px Arial'
      ctx.fillText(`Blockchain Hash: ${certificate.blockchainHash.slice(0, 20)}...`, canvas.width / 2, 400)
      ctx.fillText(`Network: ${certificate.network.toUpperCase()}`, canvas.width / 2, 430)
      
      // Convert to blob and download
      canvas.toBlob((blob) => {
        if (blob) {
          const url = URL.createObjectURL(blob)
          const a = document.createElement('a')
          a.href = url
          a.download = `certificate-${certificate.id}.png`
          a.click()
          URL.revokeObjectURL(url)
        }
      })
    }
  }, [])

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
  }

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'beginner': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
      case 'intermediate': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
      case 'advanced': return 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200'
      case 'expert': return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200'
    }
  }

  const getNetworkColor = (network: string) => {
    switch (network) {
      case 'ethereum': return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
      case 'polygon': return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200'
      case 'bsc': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200'
    }
  }

  if (!isOpen) return null

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.8 }}
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      >
        <motion.div
          initial={{ y: 50 }}
          animate={{ y: 0 }}
          className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl w-full max-w-6xl h-[90vh] flex flex-col overflow-hidden"
        >
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
            <div className="flex items-center space-x-3 rtl:space-x-reverse">
              <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-blue-500 rounded-xl flex items-center justify-center">
                <Shield className="h-6 w-6 text-white" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                  תעודות בלוקצ'יין
                </h2>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  תעודות מאומתות ומוגנות • NFT • Blockchain
                </p>
              </div>
            </div>
            
            <div className="flex items-center space-x-2 rtl:space-x-reverse">
              {!walletConnected ? (
                <button
                  onClick={connectWallet}
                  className="px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors"
                >
                  חבר ארנק
                </button>
              ) : (
                <div className="flex items-center space-x-2 rtl:space-x-reverse">
                  <span className="text-sm text-gray-600 dark:text-gray-300">
                    {walletAddress.slice(0, 6)}...{walletAddress.slice(-4)}
                  </span>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getNetworkColor(network)}`}>
                    {network.toUpperCase()}
                  </span>
                </div>
              )}
              
              <button
                onClick={onClose}
                className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
              >
                ×
              </button>
            </div>
          </div>

          <div className="flex-1 flex overflow-hidden">
            {/* Certificates List */}
            <div className="w-1/2 border-l border-gray-200 dark:border-gray-700 p-6 overflow-y-auto">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  התעודות שלי
                </h3>
                <button
                  onClick={() => generateCertificate('mock-module', {})}
                  disabled={!walletConnected || isGenerating}
                  className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  {isGenerating ? 'יוצר...' : 'צור תעודה'}
                </button>
              </div>

              {isLoading ? (
                <div className="flex items-center justify-center h-32">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-500"></div>
                </div>
              ) : (
                <div className="space-y-4">
                  {certificates.map((certificate) => (
                    <motion.div
                      key={certificate.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                        selectedCertificate?.id === certificate.id
                          ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20'
                          : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
                      }`}
                      onClick={() => setSelectedCertificate(certificate)}
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1">
                          <h4 className="font-semibold text-gray-900 dark:text-white mb-1">
                            {certificate.title}
                          </h4>
                          <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">
                            {certificate.description}
                          </p>
                        </div>
                        
                        <div className="flex items-center space-x-2 rtl:space-x-reverse">
                          {certificate.verified ? (
                            <CheckCircle className="h-5 w-5 text-green-500" />
                          ) : (
                            <Clock className="h-5 w-5 text-yellow-500" />
                          )}
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2 rtl:space-x-reverse">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getLevelColor(certificate.level)}`}>
                            {certificate.level}
                          </span>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getNetworkColor(certificate.network)}`}>
                            {certificate.network}
                          </span>
                        </div>
                        
                        <span className="text-xs text-gray-500 dark:text-gray-400">
                          {certificate.issueDate.toLocaleDateString('he-IL')}
                        </span>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>

            {/* Certificate Details */}
            <div className="flex-1 p-6 overflow-y-auto">
              {selectedCertificate ? (
                <div className="space-y-6">
                  {/* Certificate Header */}
                  <div className="text-center">
                    <div className="w-24 h-24 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Award className="h-12 w-12 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                      {selectedCertificate.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300">
                      מוענק ל: {selectedCertificate.recipient}
                    </p>
                  </div>

                  {/* Certificate Info */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                      <h4 className="font-semibold text-gray-900 dark:text-white mb-2">פרטי התעודה</h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-gray-600 dark:text-gray-400">רמה:</span>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getLevelColor(selectedCertificate.level)}`}>
                            {selectedCertificate.level}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600 dark:text-gray-400">תאריך הנפקה:</span>
                          <span className="text-gray-900 dark:text-white">
                            {selectedCertificate.issueDate.toLocaleDateString('he-IL')}
                          </span>
                        </div>
                        {selectedCertificate.expiryDate && (
                          <div className="flex justify-between">
                            <span className="text-gray-600 dark:text-gray-400">תאריך תפוגה:</span>
                            <span className="text-gray-900 dark:text-white">
                              {selectedCertificate.expiryDate.toLocaleDateString('he-IL')}
                            </span>
                          </div>
                        )}
                        <div className="flex justify-between">
                          <span className="text-gray-600 dark:text-gray-400">רשת:</span>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getNetworkColor(selectedCertificate.network)}`}>
                            {selectedCertificate.network.toUpperCase()}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                      <h4 className="font-semibold text-gray-900 dark:text-white mb-2">אימות בלוקצ'יין</h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-gray-600 dark:text-gray-400">סטטוס:</span>
                          <div className="flex items-center space-x-1 rtl:space-x-reverse">
                            {selectedCertificate.verified ? (
                              <>
                                <CheckCircle className="h-4 w-4 text-green-500" />
                                <span className="text-green-600 dark:text-green-400">מאומת</span>
                              </>
                            ) : (
                              <>
                                <Clock className="h-4 w-4 text-yellow-500" />
                                <span className="text-yellow-600 dark:text-yellow-400">ממתין לאימות</span>
                              </>
                            )}
                          </div>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600 dark:text-gray-400">בלוק:</span>
                          <span className="text-gray-900 dark:text-white">
                            #{selectedCertificate.blockNumber}
                          </span>
                        </div>
                        {selectedCertificate.nftTokenId && (
                          <div className="flex justify-between">
                            <span className="text-gray-600 dark:text-gray-400">NFT ID:</span>
                            <span className="text-gray-900 dark:text-white">
                              #{selectedCertificate.nftTokenId}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Blockchain Hash */}
                  <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Blockchain Hash</h4>
                    <div className="flex items-center space-x-2 rtl:space-x-reverse">
                      <Hash className="h-4 w-4 text-gray-500" />
                      <code className="flex-1 text-sm text-gray-600 dark:text-gray-300 font-mono break-all">
                        {selectedCertificate.blockchainHash}
                      </code>
                      <button
                        onClick={() => copyToClipboard(selectedCertificate.blockchainHash)}
                        className="p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
                      >
                        <Copy className="h-4 w-4" />
                      </button>
                    </div>
                  </div>

                  {/* Skills */}
                  <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-2">כישורים</h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedCertificate.skills.map((skill, index) => (
                        <span
                          key={index}
                          className="px-3 py-1 bg-primary-100 dark:bg-primary-900 text-primary-800 dark:text-primary-200 rounded-full text-sm"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center justify-center space-x-4 rtl:space-x-reverse">
                    <button
                      onClick={() => downloadCertificate(selectedCertificate)}
                      className="flex items-center space-x-2 rtl:space-x-reverse px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors"
                    >
                      <Download className="h-4 w-4" />
                      <span>הורד תעודה</span>
                    </button>
                    
                    <button
                      onClick={() => verifyCertificate(selectedCertificate.id)}
                      className="flex items-center space-x-2 rtl:space-x-reverse px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
                    >
                      <Eye className="h-4 w-4" />
                      <span>אמת תעודה</span>
                    </button>
                    
                    <button className="flex items-center space-x-2 rtl:space-x-reverse px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors">
                      <QrCode className="h-4 w-4" />
                      <span>QR Code</span>
                    </button>
                  </div>
                </div>
              ) : (
                <div className="flex items-center justify-center h-full">
                  <div className="text-center">
                    <Award className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-500 dark:text-gray-400">
                      בחר תעודה כדי לראות פרטים
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}
