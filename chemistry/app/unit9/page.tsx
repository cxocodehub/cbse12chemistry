'use client'

import { useRef, useEffect, useState } from 'react'

export default function Unit9() {
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
      
      pdf.save('CBSE-Class12-Chemistry-Unit9-Haloalkanes.pdf')
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
            <a href="/unit9" className="w-8 h-8 bg-yellow-500 text-white rounded-full flex items-center justify-center text-sm">9</a>
            <a href="/unit10" className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm hover:bg-blue-700">10</a>
            <a href="/practical" className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm hover:bg-blue-700">P</a>
          </div>
        </div>
        <div ref={notesRef} className="bg-white p-8 rounded-lg shadow-lg">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-blue-800">CBSE Board Class 12 Chemistry</h1>
            <h2 className="text-xl font-semibold text-gray-700 mt-2">Unit 9: Haloalkanes and Haloarenes - Complete Notes</h2>
          </div>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 border-b-2 border-blue-200 pb-2">1. Classification and Nomenclature</h2>
            <div className="space-y-4">
              <div className="bg-blue-50 p-4 rounded-lg">
                <h3 className="text-lg font-bold text-blue-800 mb-2">Haloalkanes</h3>
                <div className="bg-blue-100 p-3 rounded mt-2">
                  <ul className="text-sm text-gray-700 space-y-1">
                    <li>• <strong>Primary (1°):</strong> CH<sub><strong>3</strong></sub>CH<sub><strong>2</strong></sub>Cl (ethyl chloride)</li>
                    <li>• <strong>Secondary (2°):</strong> (CH<sub><strong>3</strong></sub>)<sub><strong>2</strong></sub>CHCl (isopropyl chloride)</li>
                    <li>• <strong>Tertiary (3°):</strong> (CH<sub><strong>3</strong></sub>)<sub><strong>3</strong></sub>CCl (tert-butyl chloride)</li>
                  </ul>
                </div>
              </div>
              
              <div className="bg-green-50 p-4 rounded-lg">
                <h3 className="text-lg font-bold text-green-800 mb-2">Haloarenes</h3>
                <div className="bg-green-100 p-3 rounded mt-2">
                  <ul className="text-sm text-gray-700 space-y-1">
                    <li>• Halogen directly attached to benzene ring</li>
                    <li>• Examples: C<sub><strong>6</strong></sub>H<sub><strong>5</strong></sub>Cl (chlorobenzene), C<sub><strong>6</strong></sub>H<sub><strong>5</strong></sub>Br (bromobenzene)</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 border-b-2 border-blue-200 pb-2">2. Preparation Methods</h2>
            <div className="space-y-4">
              <div className="bg-red-50 p-4 rounded-lg">
                <h3 className="text-lg font-bold text-red-800 mb-2">From Alcohols</h3>
                <div className="bg-red-100 p-3 rounded mt-2">
                  <p className="text-sm font-semibold text-red-800 mb-1">With HX:</p>
                  <p className="text-sm text-gray-900 font-semibold">R-OH + HX → R-X + H<sub><strong>2</strong></sub>O</p>
                  <p className="text-sm font-semibold text-red-800 mb-1 mt-2">With PCl<sub><strong>5</strong></sub>:</p>
                  <p className="text-sm text-gray-900 font-semibold">R-OH + PCl<sub><strong>5</strong></sub> → R-Cl + POCl<sub><strong>3</strong></sub> + HCl</p>
                </div>
              </div>
              
              <div className="bg-purple-50 p-4 rounded-lg">
                <h3 className="text-lg font-bold text-purple-800 mb-2">From Alkenes</h3>
                <div className="bg-purple-100 p-3 rounded mt-2">
                  <p className="text-sm font-semibold text-purple-800 mb-1">Addition of HX:</p>
                  <p className="text-sm text-gray-900 font-semibold">CH<sub><strong>2</strong></sub>=CH<sub><strong>2</strong></sub> + HBr → CH<sub><strong>3</strong></sub>CH<sub><strong>2</strong></sub>Br</p>
                  <p className="text-sm text-gray-700 mt-1">Follows Markovnikov's rule</p>
                </div>
              </div>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 border-b-2 border-blue-200 pb-2">3. Reactions</h2>
            <div className="space-y-4">
              <div className="bg-yellow-50 p-4 rounded-lg">
                <h3 className="text-lg font-bold text-yellow-800 mb-2">Nucleophilic Substitution</h3>
                <div className="bg-yellow-100 p-3 rounded mt-2">
                  <p className="text-sm font-semibold text-yellow-800 mb-1">SN1 Mechanism:</p>
                  <ul className="text-sm text-gray-700 space-y-1">
                    <li>• Two-step process</li>
                    <li>• Formation of carbocation intermediate</li>
                    <li>• Rate depends only on substrate concentration</li>
                    <li>• Order: 3° > 2° > 1°</li>
                  </ul>
                  <p className="text-sm font-semibold text-yellow-800 mb-1 mt-2">SN2 Mechanism:</p>
                  <ul className="text-sm text-gray-700 space-y-1">
                    <li>• One-step process</li>
                    <li>• Backside attack by nucleophile</li>
                    <li>• Rate depends on both substrate and nucleophile</li>
                    <li>• Order: 1° > 2° > 3°</li>
                  </ul>
                </div>
              </div>
              
              <div className="bg-orange-50 p-4 rounded-lg">
                <h3 className="text-lg font-bold text-orange-800 mb-2">Elimination Reactions</h3>
                <div className="bg-orange-100 p-3 rounded mt-2">
                  <p className="text-sm font-semibold text-orange-800 mb-1">Dehydrohalogenation:</p>
                  <p className="text-sm text-gray-900 font-semibold">CH<sub><strong>3</strong></sub>CH<sub><strong>2</strong></sub>Br + KOH(alc) → CH<sub><strong>2</strong></sub>=CH<sub><strong>2</strong></sub> + KBr + H<sub><strong>2</strong></sub>O</p>
                  <p className="text-sm text-gray-700 mt-1">Follows Saytzeff's rule</p>
                </div>
              </div>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 border-b-2 border-blue-200 pb-2">4. Board Questions</h2>
            <div className="space-y-4">
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-bold mb-2">MCQs (1 Mark):</h3>
                <div className="space-y-2 text-sm">
                  <div>1. SN1 reaction is favored by: (a) Primary halides (b) Secondary halides (c) Tertiary halides (d) All equally<br/><span className="text-green-600">Answer: (c)</span></div>
                  <div>2. Saytzeff's rule is related to: (a) Substitution (b) Elimination (c) Addition (d) Rearrangement<br/><span className="text-green-600">Answer: (b)</span></div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}