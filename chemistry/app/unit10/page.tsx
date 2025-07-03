'use client'

import { useRef, useEffect, useState } from 'react'

export default function Unit10() {
  const notesRef = useRef<HTMLDivElement>(null)
  const [isClient, setIsClient] = useState(false)

  const downloadPDF = async () => {
    if (!notesRef.current) return
    
    try {
      const jsPDF = (await import('jspdf')).default
      const html2canvas = (await import('html2canvas')).default
      
      await new Promise(resolve => setTimeout(resolve, 1500))
      
      const canvas = await html2canvas(notesRef.current, { 
        scale: 2,
        useCORS: true,
        allowTaint: true,
        backgroundColor: '#ffffff',
        logging: false
      })
      
      const imgData = canvas.toDataURL('image/png', 1.0)
      const pdf = new jsPDF('p', 'mm', 'a4')
      
      const pdfWidth = pdf.internal.pageSize.getWidth()
      const pdfHeight = pdf.internal.pageSize.getHeight() - 20
      const imgWidth = pdfWidth - 10
      const imgHeight = (canvas.height * imgWidth) / canvas.width
      
      const totalPages = Math.ceil(imgHeight / pdfHeight)
      
      for (let i = 0; i < totalPages; i++) {
        if (i > 0) pdf.addPage()
        
        const yPosition = -(i * pdfHeight)
        pdf.addImage(imgData, 'PNG', 5, yPosition, imgWidth, imgHeight)
        
        pdf.setFontSize(10)
        pdf.setTextColor(100)
        pdf.text(`Page ${i + 1} of ${totalPages}`, pdfWidth - 30, pdfHeight + 15)
      }
      
      pdf.save('CBSE-Class12-Chemistry-Unit10-AlcoholsPhenolsEthers.pdf')
    } catch (error) {
      console.error('PDF generation failed:', error)
    }
  }

  useEffect(() => {
    setIsClient(true)
  }, [])

  if (!isClient) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-xl">Loading...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="flex justify-end mb-4">
          <div className="flex space-x-2">
            <a href="/" className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm hover:bg-blue-700">1</a>
            <a href="/unit2" className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm hover:bg-blue-700">2</a>
            <a href="/unit3" className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm hover:bg-blue-700">3</a>
            <a href="/unit4" className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm hover:bg-blue-700">4</a>
            <a href="/unit5" className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm hover:bg-blue-700">5</a>
            <a href="/unit6" className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm hover:bg-blue-700">6</a>
            <a href="/unit7" className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm hover:bg-blue-700">7</a>
            <a href="/unit8" className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm hover:bg-blue-700">8</a>
            <a href="/unit9" className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm hover:bg-blue-700">9</a>
            <a href="/unit10" className="w-8 h-8 bg-yellow-500 text-white rounded-full flex items-center justify-center text-sm">10</a>
            <a href="/practical" className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm hover:bg-blue-700">P</a>
          </div>
        </div>
        <div ref={notesRef} className="bg-white p-8 rounded-lg shadow-lg">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-blue-800">CBSE Board Class 12 Chemistry</h1>
            <h2 className="text-xl font-semibold text-gray-700 mt-2">Unit 10: Alcohols, Phenols and Ethers - Complete Notes</h2>
          </div>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 border-b-2 border-blue-200 pb-2">1. Alcohols</h2>
            <div className="space-y-4">
              <div className="bg-blue-50 p-4 rounded-lg">
                <h3 className="text-lg font-bold text-blue-800 mb-2">Classification</h3>
                <div className="bg-blue-100 p-3 rounded mt-2">
                  <ul className="text-sm text-gray-700 space-y-1">
                    <li>• <strong>Primary (1°):</strong> CH<sub><strong>3</strong></sub>CH<sub><strong>2</strong></sub>OH (ethanol)</li>
                    <li>• <strong>Secondary (2°):</strong> (CH<sub><strong>3</strong></sub>)<sub><strong>2</strong></sub>CHOH (isopropanol)</li>
                    <li>• <strong>Tertiary (3°):</strong> (CH<sub><strong>3</strong></sub>)<sub><strong>3</strong></sub>COH (tert-butanol)</li>
                  </ul>
                </div>
              </div>
              
              <div className="bg-green-50 p-4 rounded-lg">
                <h3 className="text-lg font-bold text-green-800 mb-2">Preparation</h3>
                <div className="bg-green-100 p-3 rounded mt-2">
                  <p className="text-sm font-semibold text-green-800 mb-1">From Alkenes:</p>
                  <p className="text-sm text-gray-900 font-semibold">CH<sub><strong>2</strong></sub>=CH<sub><strong>2</strong></sub> + H<sub><strong>2</strong></sub>O → CH<sub><strong>3</strong></sub>CH<sub><strong>2</strong></sub>OH</p>
                  <p className="text-sm font-semibold text-green-800 mb-1 mt-2">From Carbonyl Compounds:</p>
                  <p className="text-sm text-gray-900 font-semibold">RCHO + H<sub><strong>2</strong></sub> → RCH<sub><strong>2</strong></sub>OH</p>
                </div>
              </div>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 border-b-2 border-blue-200 pb-2">2. Phenols</h2>
            <div className="space-y-4">
              <div className="bg-red-50 p-4 rounded-lg">
                <h3 className="text-lg font-bold text-red-800 mb-2">Structure and Properties</h3>
                <div className="bg-red-100 p-3 rounded mt-2">
                  <ul className="text-sm text-gray-700 space-y-1">
                    <li>• OH group directly attached to benzene ring</li>
                    <li>• More acidic than alcohols due to resonance stabilization</li>
                    <li>• Forms phenoxide ion: C<sub><strong>6</strong></sub>H<sub><strong>5</strong></sub>OH → C<sub><strong>6</strong></sub>H<sub><strong>5</strong></sub>O<sup><strong>-</strong></sup> + H<sup><strong>+</strong></sup></li>
                  </ul>
                </div>
              </div>
              
              <div className="bg-purple-50 p-4 rounded-lg">
                <h3 className="text-lg font-bold text-purple-800 mb-2">Reactions</h3>
                <div className="bg-purple-100 p-3 rounded mt-2">
                  <p className="text-sm font-semibold text-purple-800 mb-1">Electrophilic Substitution:</p>
                  <ul className="text-sm text-gray-700 space-y-1">
                    <li>• Nitration: Forms o-nitrophenol and p-nitrophenol</li>
                    <li>• Halogenation: Forms 2,4,6-tribromophenol with Br<sub><strong>2</strong></sub>/H<sub><strong>2</strong></sub>O</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 border-b-2 border-blue-200 pb-2">3. Ethers</h2>
            <div className="space-y-4">
              <div className="bg-yellow-50 p-4 rounded-lg">
                <h3 className="text-lg font-bold text-yellow-800 mb-2">Structure and Nomenclature</h3>
                <div className="bg-yellow-100 p-3 rounded mt-2">
                  <ul className="text-sm text-gray-700 space-y-1">
                    <li>• General formula: R-O-R'</li>
                    <li>• <strong>Symmetrical:</strong> CH<sub><strong>3</strong></sub>-O-CH<sub><strong>3</strong></sub> (dimethyl ether)</li>
                    <li>• <strong>Unsymmetrical:</strong> CH<sub><strong>3</strong></sub>-O-C<sub><strong>2</strong></sub>H<sub><strong>5</strong></sub> (methyl ethyl ether)</li>
                  </ul>
                </div>
              </div>
              
              <div className="bg-orange-50 p-4 rounded-lg">
                <h3 className="text-lg font-bold text-orange-800 mb-2">Preparation</h3>
                <div className="bg-orange-100 p-3 rounded mt-2">
                  <p className="text-sm font-semibold text-orange-800 mb-1">Williamson Synthesis:</p>
                  <p className="text-sm text-gray-900 font-semibold">R-ONa + R'-X → R-O-R' + NaX</p>
                  <p className="text-sm font-semibold text-orange-800 mb-1 mt-2">Dehydration of Alcohols:</p>
                  <p className="text-sm text-gray-900 font-semibold">2R-OH → R-O-R + H<sub><strong>2</strong></sub>O (at 140°C)</p>
                </div>
              </div>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 border-b-2 border-blue-200 pb-2">4. Important Reactions</h2>
            <div className="space-y-4">
              <div className="bg-indigo-50 p-4 rounded-lg">
                <h3 className="text-lg font-bold text-indigo-800 mb-2">Oxidation of Alcohols</h3>
                <div className="bg-indigo-100 p-3 rounded mt-2">
                  <ul className="text-sm text-gray-700 space-y-1">
                    <li>• <strong>Primary:</strong> RCH<sub><strong>2</strong></sub>OH → RCHO → RCOOH</li>
                    <li>• <strong>Secondary:</strong> R<sub><strong>2</strong></sub>CHOH → R<sub><strong>2</strong></sub>CO</li>
                    <li>• <strong>Tertiary:</strong> No oxidation under mild conditions</li>
                  </ul>
                </div>
              </div>
              
              <div className="bg-teal-50 p-4 rounded-lg">
                <h3 className="text-lg font-bold text-teal-800 mb-2">Cleavage of Ethers</h3>
                <div className="bg-teal-100 p-3 rounded mt-2">
                  <p className="text-sm font-semibold text-teal-800 mb-1">With HI:</p>
                  <p className="text-sm text-gray-900 font-semibold">R-O-R' + HI → R-I + R'-OH</p>
                  <p className="text-sm text-gray-700 mt-1">Follows SN2 mechanism for primary ethers</p>
                </div>
              </div>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 border-b-2 border-blue-200 pb-2">5. Board Questions</h2>
            <div className="space-y-4">
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-bold mb-2">MCQs (1 Mark):</h3>
                <div className="space-y-2 text-sm">
                  <div>1. Phenol is more acidic than alcohol due to: (a) Inductive effect (b) Resonance (c) Hyperconjugation (d) Steric effect<br/><span className="text-green-600">Answer: (b)</span></div>
                  <div>2. Williamson synthesis is used to prepare: (a) Alcohols (b) Phenols (c) Ethers (d) Aldehydes<br/><span className="text-green-600">Answer: (c)</span></div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}