'use client'

import { useRef, useEffect, useState } from 'react'

export default function Unit7() {
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
      
      pdf.save('CBSE-Class12-Chemistry-Unit7-Alcohols-Phenols-Ethers.pdf')
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
    <>
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-4xl mx-auto px-4">
          <div className="flex justify-end mb-4">
            <div className="flex space-x-2">
              <a href="/" className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm hover:bg-blue-700" title="Solutions">1</a>
              <a href="/unit2" className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm hover:bg-blue-700" title="Electrochemistry">2</a>
              <a href="/unit3" className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm hover:bg-blue-700" title="Chemical Kinetics">3</a>
              <a href="/unit4" className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm hover:bg-blue-700" title="d-and f-Block Elements">4</a>
              <a href="/unit5" className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm hover:bg-blue-700" title="Coordination Compounds">5</a>
              <a href="/unit6" className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm hover:bg-blue-700" title="Haloalkanes and Haloarenes">6</a>
              <a href="/unit7" className="w-8 h-8 bg-yellow-500 text-white rounded-full flex items-center justify-center text-sm" title="Alcohols, Phenols and Ethers">7</a>
              <a href="/unit8" className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm hover:bg-blue-700" title="Aldehydes, Ketones and Carboxylic Acids">8</a>
              <a href="/unit9" className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm hover:bg-blue-700" title="Amines">9</a>
              <a href="/unit10" className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm hover:bg-blue-700" title="Biomolecules">10</a>
              <a href="/practical" className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm hover:bg-blue-700" title="Practical">P</a>
            </div>
          </div>
          
          <div ref={notesRef} className="bg-white p-8 rounded-lg shadow-lg">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-blue-800">CBSE Class 12 Chemistry</h1>
              <h2 className="text-xl font-semibold text-gray-700 mt-2">Unit 7: Alcohols, Phenols and Ethers - Complete Notes</h2>
            </div>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4 border-b-2 border-blue-200 pb-2">1. Alcohols - Structure & Classification</h2>
              <div className="bg-blue-50 p-4 rounded-lg mb-4">
                <h3 className="text-lg font-bold text-blue-800 mb-2">Alcohol Structures</h3>
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="bg-blue-100 p-3 rounded">
                    <p className="text-sm font-semibold text-blue-800 mb-2">Methanol (CH₃OH):</p>
                    <div className="text-center">
                      <svg width="100" height="80" viewBox="0 0 100 80" className="mx-auto">
                        <circle cx="50" cy="40" r="8" fill="#000" stroke="#000" strokeWidth="1"/>
                        <text x="50" y="45" fontSize="10" textAnchor="middle" fill="#FFF">C</text>
                        <circle cx="80" cy="40" r="6" fill="#FF0000" stroke="#000" strokeWidth="1"/>
                        <text x="80" y="44" fontSize="8" textAnchor="middle" fill="#FFF">O</text>
                        <circle cx="95" cy="40" r="4" fill="#FFF" stroke="#000" strokeWidth="1"/>
                        <text x="95" y="43" fontSize="6" textAnchor="middle" fill="#000">H</text>
                        <circle cx="35" cy="25" r="4" fill="#FFF" stroke="#000" strokeWidth="1"/>
                        <text x="35" y="28" fontSize="6" textAnchor="middle" fill="#000">H</text>
                        <circle cx="35" cy="55" r="4" fill="#FFF" stroke="#000" strokeWidth="1"/>
                        <text x="35" y="58" fontSize="6" textAnchor="middle" fill="#000">H</text>
                        <circle cx="20" cy="40" r="4" fill="#FFF" stroke="#000" strokeWidth="1"/>
                        <text x="20" y="43" fontSize="6" textAnchor="middle" fill="#000">H</text>
                        <line x1="58" y1="40" x2="74" y2="40" stroke="#000" strokeWidth="2"/>
                        <line x1="86" y1="40" x2="91" y2="40" stroke="#000" strokeWidth="1"/>
                        <line x1="42" y1="40" x2="39" y2="29" stroke="#000" strokeWidth="1"/>
                        <line x1="42" y1="40" x2="39" y2="51" stroke="#000" strokeWidth="1"/>
                        <line x1="42" y1="40" x2="24" y2="40" stroke="#000" strokeWidth="1"/>
                      </svg>
                    </div>
                    <p className="text-xs text-gray-600 text-center">Primary alcohol</p>
                  </div>
                  <div className="bg-blue-100 p-3 rounded">
                    <p className="text-sm font-semibold text-blue-800 mb-2">Ethanol (C₂H₅OH):</p>
                    <div className="text-center">
                      <svg width="140" height="80" viewBox="0 0 140 80" className="mx-auto">
                        <circle cx="40" cy="40" r="8" fill="#000" stroke="#000" strokeWidth="1"/>
                        <text x="40" y="45" fontSize="10" textAnchor="middle" fill="#FFF">C</text>
                        <circle cx="80" cy="40" r="8" fill="#000" stroke="#000" strokeWidth="1"/>
                        <text x="80" y="45" fontSize="10" textAnchor="middle" fill="#FFF">C</text>
                        <circle cx="110" cy="40" r="6" fill="#FF0000" stroke="#000" strokeWidth="1"/>
                        <text x="110" y="44" fontSize="8" textAnchor="middle" fill="#FFF">O</text>
                        <circle cx="125" cy="40" r="4" fill="#FFF" stroke="#000" strokeWidth="1"/>
                        <text x="125" y="43" fontSize="6" textAnchor="middle" fill="#000">H</text>
                        <circle cx="25" cy="25" r="4" fill="#FFF" stroke="#000" strokeWidth="1"/>
                        <text x="25" y="28" fontSize="6" textAnchor="middle" fill="#000">H</text>
                        <circle cx="25" cy="55" r="4" fill="#FFF" stroke="#000" strokeWidth="1"/>
                        <text x="25" y="58" fontSize="6" textAnchor="middle" fill="#000">H</text>
                        <circle cx="10" cy="40" r="4" fill="#FFF" stroke="#000" strokeWidth="1"/>
                        <text x="10" y="43" fontSize="6" textAnchor="middle" fill="#000">H</text>
                        <circle cx="80" cy="20" r="4" fill="#FFF" stroke="#000" strokeWidth="1"/>
                        <text x="80" y="23" fontSize="6" textAnchor="middle" fill="#000">H</text>
                        <circle cx="80" cy="60" r="4" fill="#FFF" stroke="#000" strokeWidth="1"/>
                        <text x="80" y="63" fontSize="6" textAnchor="middle" fill="#000">H</text>
                        <line x1="48" y1="40" x2="72" y2="40" stroke="#000" strokeWidth="2"/>
                        <line x1="88" y1="40" x2="104" y2="40" stroke="#000" strokeWidth="2"/>
                        <line x1="116" y1="40" x2="121" y2="40" stroke="#000" strokeWidth="1"/>
                        <line x1="32" y1="40" x2="29" y2="29" stroke="#000" strokeWidth="1"/>
                        <line x1="32" y1="40" x2="29" y2="51" stroke="#000" strokeWidth="1"/>
                        <line x1="32" y1="40" x2="14" y2="40" stroke="#000" strokeWidth="1"/>
                        <line x1="80" y1="32" x2="80" y2="24" stroke="#000" strokeWidth="1"/>
                        <line x1="80" y1="48" x2="80" y2="56" stroke="#000" strokeWidth="1"/>
                      </svg>
                    </div>
                    <p className="text-xs text-gray-600 text-center">Primary alcohol</p>
                  </div>
                  <div className="bg-blue-100 p-3 rounded">
                    <p className="text-sm font-semibold text-blue-800 mb-2">Isopropanol:</p>
                    <div className="text-center">
                      <svg width="120" height="100" viewBox="0 0 120 100" className="mx-auto">
                        <circle cx="60" cy="50" r="8" fill="#000" stroke="#000" strokeWidth="1"/>
                        <text x="60" y="55" fontSize="10" textAnchor="middle" fill="#FFF">C</text>
                        <circle cx="90" cy="50" r="6" fill="#FF0000" stroke="#000" strokeWidth="1"/>
                        <text x="90" y="54" fontSize="8" textAnchor="middle" fill="#FFF">O</text>
                        <circle cx="105" cy="50" r="4" fill="#FFF" stroke="#000" strokeWidth="1"/>
                        <text x="105" y="53" fontSize="6" textAnchor="middle" fill="#000">H</text>
                        <circle cx="60" cy="25" r="4" fill="#FFF" stroke="#000" strokeWidth="1"/>
                        <text x="60" y="28" fontSize="6" textAnchor="middle" fill="#000">H</text>
                        <circle cx="40" cy="30" r="6" fill="#000" stroke="#000" strokeWidth="1"/>
                        <text x="40" y="34" fontSize="8" textAnchor="middle" fill="#FFF">CH₃</text>
                        <circle cx="40" cy="70" r="6" fill="#000" stroke="#000" strokeWidth="1"/>
                        <text x="40" y="74" fontSize="8" textAnchor="middle" fill="#FFF">CH₃</text>
                        <line x1="68" y1="50" x2="84" y2="50" stroke="#000" strokeWidth="2"/>
                        <line x1="96" y1="50" x2="101" y2="50" stroke="#000" strokeWidth="1"/>
                        <line x1="60" y1="42" x2="60" y2="29" stroke="#000" strokeWidth="1"/>
                        <line x1="52" y1="50" x2="46" y2="36" stroke="#000" strokeWidth="1"/>
                        <line x1="52" y1="50" x2="46" y2="64" stroke="#000" strokeWidth="1"/>
                      </svg>
                    </div>
                    <p className="text-xs text-gray-600 text-center">Secondary alcohol</p>
                  </div>
                </div>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4 border-b-2 border-blue-200 pb-2">2. Phenols - Structure & Properties</h2>
              <div className="bg-green-50 p-4 rounded-lg mb-4">
                <h3 className="text-lg font-bold text-green-800 mb-2">Phenol Structure & Resonance</h3>
                <div className="bg-green-100 p-3 rounded">
                  <div className="text-center">
                    <svg width="250" height="200" viewBox="0 0 250 200" className="mx-auto">
                      <text x="125" y="20" fontSize="12" textAnchor="middle" fill="#000" fontWeight="bold">Phenol (C₆H₅OH)</text>
                      <circle cx="125" cy="60" r="8" fill="#000" stroke="#000" strokeWidth="1"/>
                      <text x="125" y="65" fontSize="10" textAnchor="middle" fill="#FFF">C</text>
                      <circle cx="155" cy="80" r="8" fill="#000" stroke="#000" strokeWidth="1"/>
                      <text x="155" y="85" fontSize="10" textAnchor="middle" fill="#FFF">C</text>
                      <circle cx="155" cy="120" r="8" fill="#000" stroke="#000" strokeWidth="1"/>
                      <text x="155" y="125" fontSize="10" textAnchor="middle" fill="#FFF">C</text>
                      <circle cx="125" cy="140" r="8" fill="#000" stroke="#000" strokeWidth="1"/>
                      <text x="125" y="145" fontSize="10" textAnchor="middle" fill="#FFF">C</text>
                      <circle cx="95" cy="120" r="8" fill="#000" stroke="#000" strokeWidth="1"/>
                      <text x="95" y="125" fontSize="10" textAnchor="middle" fill="#FFF">C</text>
                      <circle cx="95" cy="80" r="8" fill="#000" stroke="#000" strokeWidth="1"/>
                      <text x="95" y="85" fontSize="10" textAnchor="middle" fill="#FFF">C</text>
                      <circle cx="125" cy="35" r="6" fill="#FF0000" stroke="#000" strokeWidth="1"/>
                      <text x="125" y="39" fontSize="8" textAnchor="middle" fill="#FFF">O</text>
                      <circle cx="125" cy="20" r="4" fill="#FFF" stroke="#000" strokeWidth="1"/>
                      <text x="125" y="23" fontSize="6" textAnchor="middle" fill="#000">H</text>
                      <circle cx="170" cy="75" r="4" fill="#FFF" stroke="#000" strokeWidth="1"/>
                      <text x="170" y="78" fontSize="6" textAnchor="middle" fill="#000">H</text>
                      <circle cx="170" cy="125" r="4" fill="#FFF" stroke="#000" strokeWidth="1"/>
                      <text x="170" y="128" fontSize="6" textAnchor="middle" fill="#000">H</text>
                      <circle cx="125" cy="155" r="4" fill="#FFF" stroke="#000" strokeWidth="1"/>
                      <text x="125" y="158" fontSize="6" textAnchor="middle" fill="#000">H</text>
                      <circle cx="80" cy="125" r="4" fill="#FFF" stroke="#000" strokeWidth="1"/>
                      <text x="80" y="128" fontSize="6" textAnchor="middle" fill="#000">H</text>
                      <circle cx="80" cy="75" r="4" fill="#FFF" stroke="#000" strokeWidth="1"/>
                      <text x="80" y="78" fontSize="6" textAnchor="middle" fill="#000">H</text>
                      <line x1="125" y1="52" x2="125" y2="41" stroke="#000" strokeWidth="2"/>
                      <line x1="125" y1="29" x2="125" y2="24" stroke="#000" strokeWidth="1"/>
                      <line x1="133" y1="68" x2="147" y2="80" stroke="#000" strokeWidth="2"/>
                      <line x1="155" y1="88" x2="155" y2="112" stroke="#000" strokeWidth="1"/>
                      <line x1="147" y1="128" x2="133" y2="132" stroke="#000" strokeWidth="2"/>
                      <line x1="117" y1="132" x2="103" y2="128" stroke="#000" strokeWidth="1"/>
                      <line x1="95" y1="112" x2="95" y2="88" stroke="#000" strokeWidth="2"/>
                      <line x1="103" y1="72" x2="117" y2="68" stroke="#000" strokeWidth="1"/>
                      <line x1="163" y1="80" x2="166" y2="75" stroke="#000" strokeWidth="1"/>
                      <line x1="163" y1="120" x2="166" y2="125" stroke="#000" strokeWidth="1"/>
                      <line x1="125" y1="148" x2="125" y2="151" stroke="#000" strokeWidth="1"/>
                      <line x1="87" y1="120" x2="84" y2="125" stroke="#000" strokeWidth="1"/>
                      <line x1="87" y1="80" x2="84" y2="75" stroke="#000" strokeWidth="1"/>
                      <text x="200" y="80" fontSize="10" fill="#000">Resonance makes</text>
                      <text x="200" y="95" fontSize="10" fill="#000">O-H bond polar</text>
                      <text x="200" y="110" fontSize="10" fill="#000">and acidic</text>
                    </svg>
                  </div>
                  <p className="text-xs text-gray-600 text-center mt-2">Phenol shows resonance, making it more acidic than alcohols</p>
                </div>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4 border-b-2 border-blue-200 pb-2">3. Ethers - Structure & Types</h2>
              <div className="bg-yellow-50 p-4 rounded-lg">
                <h3 className="text-lg font-bold text-yellow-800 mb-2">Ether Structures</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="bg-yellow-100 p-3 rounded">
                    <p className="text-sm font-semibold text-yellow-800 mb-2">Diethyl Ether (C₂H₅-O-C₂H₅):</p>
                    <div className="text-center">
                      <svg width="200" height="80" viewBox="0 0 200 80" className="mx-auto">
                        <circle cx="50" cy="40" r="8" fill="#000" stroke="#000" strokeWidth="1"/>
                        <text x="50" y="45" fontSize="10" textAnchor="middle" fill="#FFF">C</text>
                        <circle cx="80" cy="40" r="8" fill="#000" stroke="#000" strokeWidth="1"/>
                        <text x="80" y="45" fontSize="10" textAnchor="middle" fill="#FFF">C</text>
                        <circle cx="110" cy="40" r="6" fill="#FF0000" stroke="#000" strokeWidth="1"/>
                        <text x="110" y="44" fontSize="8" textAnchor="middle" fill="#FFF">O</text>
                        <circle cx="140" cy="40" r="8" fill="#000" stroke="#000" strokeWidth="1"/>
                        <text x="140" y="45" fontSize="10" textAnchor="middle" fill="#FFF">C</text>
                        <circle cx="170" cy="40" r="8" fill="#000" stroke="#000" strokeWidth="1"/>
                        <text x="170" y="45" fontSize="10" textAnchor="middle" fill="#FFF">C</text>
                        <circle cx="35" cy="25" r="4" fill="#FFF" stroke="#000" strokeWidth="1"/>
                        <text x="35" y="28" fontSize="6" textAnchor="middle" fill="#000">H</text>
                        <circle cx="35" cy="55" r="4" fill="#FFF" stroke="#000" strokeWidth="1"/>
                        <text x="35" y="58" fontSize="6" textAnchor="middle" fill="#000">H</text>
                        <circle cx="20" cy="40" r="4" fill="#FFF" stroke="#000" strokeWidth="1"/>
                        <text x="20" y="43" fontSize="6" textAnchor="middle" fill="#000">H</text>
                        <circle cx="80" cy="20" r="4" fill="#FFF" stroke="#000" strokeWidth="1"/>
                        <text x="80" y="23" fontSize="6" textAnchor="middle" fill="#000">H</text>
                        <circle cx="80" cy="60" r="4" fill="#FFF" stroke="#000" strokeWidth="1"/>
                        <text x="80" y="63" fontSize="6" textAnchor="middle" fill="#000">H</text>
                        <circle cx="140" cy="20" r="4" fill="#FFF" stroke="#000" strokeWidth="1"/>
                        <text x="140" y="23" fontSize="6" textAnchor="middle" fill="#000">H</text>
                        <circle cx="140" cy="60" r="4" fill="#FFF" stroke="#000" strokeWidth="1"/>
                        <text x="140" y="63" fontSize="6" textAnchor="middle" fill="#000">H</text>
                        <circle cx="185" cy="25" r="4" fill="#FFF" stroke="#000" strokeWidth="1"/>
                        <text x="185" y="28" fontSize="6" textAnchor="middle" fill="#000">H</text>
                        <circle cx="185" cy="55" r="4" fill="#FFF" stroke="#000" strokeWidth="1"/>
                        <text x="185" y="58" fontSize="6" textAnchor="middle" fill="#000">H</text>
                        <circle cx="200" cy="40" r="4" fill="#FFF" stroke="#000" strokeWidth="1"/>
                        <text x="200" y="43" fontSize="6" textAnchor="middle" fill="#000">H</text>
                        <line x1="58" y1="40" x2="72" y2="40" stroke="#000" strokeWidth="2"/>
                        <line x1="88" y1="40" x2="104" y2="40" stroke="#000" strokeWidth="2"/>
                        <line x1="116" y1="40" x2="132" y2="40" stroke="#000" strokeWidth="2"/>
                        <line x1="148" y1="40" x2="162" y2="40" stroke="#000" strokeWidth="2"/>
                        <line x1="42" y1="40" x2="39" y2="29" stroke="#000" strokeWidth="1"/>
                        <line x1="42" y1="40" x2="39" y2="51" stroke="#000" strokeWidth="1"/>
                        <line x1="42" y1="40" x2="24" y2="40" stroke="#000" strokeWidth="1"/>
                        <line x1="80" y1="32" x2="80" y2="24" stroke="#000" strokeWidth="1"/>
                        <line x1="80" y1="48" x2="80" y2="56" stroke="#000" strokeWidth="1"/>
                        <line x1="140" y1="32" x2="140" y2="24" stroke="#000" strokeWidth="1"/>
                        <line x1="140" y1="48" x2="140" y2="56" stroke="#000" strokeWidth="1"/>
                        <line x1="178" y1="40" x2="181" y2="29" stroke="#000" strokeWidth="1"/>
                        <line x1="178" y1="40" x2="181" y2="51" stroke="#000" strokeWidth="1"/>
                        <line x1="178" y1="40" x2="196" y2="40" stroke="#000" strokeWidth="1"/>
                      </svg>
                    </div>
                    <p className="text-xs text-gray-600 text-center">Symmetrical ether</p>
                  </div>
                  <div className="bg-yellow-100 p-3 rounded">
                    <p className="text-sm font-semibold text-yellow-800 mb-2">Anisole (C₆H₅-O-CH₃):</p>
                    <div className="text-center">
                      <svg width="180" height="150" viewBox="0 0 180 150" className="mx-auto">
                        <circle cx="80" cy="60" r="8" fill="#000" stroke="#000" strokeWidth="1"/>
                        <circle cx="110" cy="80" r="8" fill="#000" stroke="#000" strokeWidth="1"/>
                        <circle cx="110" cy="120" r="8" fill="#000" stroke="#000" strokeWidth="1"/>
                        <circle cx="80" cy="140" r="8" fill="#000" stroke="#000" strokeWidth="1"/>
                        <circle cx="50" cy="120" r="8" fill="#000" stroke="#000" strokeWidth="1"/>
                        <circle cx="50" cy="80" r="8" fill="#000" stroke="#000" strokeWidth="1"/>
                        <circle cx="80" cy="35" r="6" fill="#FF0000" stroke="#000" strokeWidth="1"/>
                        <text x="80" y="39" fontSize="8" textAnchor="middle" fill="#FFF">O</text>
                        <circle cx="80" cy="15" r="6" fill="#000" stroke="#000" strokeWidth="1"/>
                        <text x="80" y="19" fontSize="8" textAnchor="middle" fill="#FFF">CH₃</text>
                        <line x1="80" y1="52" x2="80" y2="41" stroke="#000" strokeWidth="2"/>
                        <line x1="80" y1="29" x2="80" y2="21" stroke="#000" strokeWidth="2"/>
                        <line x1="88" y1="68" x2="102" y2="80" stroke="#000" strokeWidth="2"/>
                        <line x1="110" y1="88" x2="110" y2="112" stroke="#000" strokeWidth="1"/>
                        <line x1="102" y1="128" x2="88" y2="132" stroke="#000" strokeWidth="2"/>
                        <line x1="72" y1="132" x2="58" y2="128" stroke="#000" strokeWidth="1"/>
                        <line x1="50" y1="112" x2="50" y2="88" stroke="#000" strokeWidth="2"/>
                        <line x1="58" y1="72" x2="72" y2="68" stroke="#000" strokeWidth="1"/>
                        <text x="130" y="100" fontSize="10" fill="#000">Aromatic ether</text>
                      </svg>
                    </div>
                    <p className="text-xs text-gray-600 text-center">Aromatic ether</p>
                  </div>
                </div>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4 border-b-2 border-blue-200 pb-2">4. Previous Years' Board Questions</h2>
              <div className="space-y-4">
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h3 className="font-bold mb-3 text-blue-800">1 Mark Questions (MCQs):</h3>
                  <div className="space-y-2 text-sm">
                    <div className="bg-blue-100 p-2 rounded">
                      <p><strong>Q1.</strong> Phenol is more acidic than alcohol due to: (a) Resonance (b) Induction (c) Hyperconjugation</p>
                      <p className="text-green-600 font-semibold">Answer: (a) Resonance</p>
                    </div>
                    <div className="bg-blue-100 p-2 rounded">
                      <p><strong>Q2.</strong> Lucas test is used to distinguish: (a) 1°, 2°, 3° alcohols (b) Alcohols and phenols</p>
                      <p className="text-green-600 font-semibold">Answer: (a) 1°, 2°, 3° alcohols</p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-green-50 p-4 rounded-lg">
                  <h3 className="font-bold mb-3 text-green-800">2-3 Mark Questions:</h3>
                  <div className="space-y-3 text-sm">
                    <div className="bg-green-100 p-3 rounded">
                      <p className="font-semibold">Q1. Explain why phenol is more acidic than alcohol.</p>
                      <p className="text-gray-700 mt-1"><strong>Answer:</strong> Phenoxide ion is resonance stabilized, making phenol more acidic than alcohols where alkoxide ion lacks resonance stabilization.</p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4 border-b-2 border-blue-200 pb-2">5. Memory Techniques & Mnemonics</h2>
              <div className="bg-yellow-50 p-4 rounded-lg">
                <h3 className="text-lg font-bold text-yellow-800 mb-3">🧠 Smart Memory Tricks</h3>
                <div className="space-y-3 text-sm">
                  <div className="bg-yellow-100 p-3 rounded">
                    <p className="font-semibold text-yellow-800">Alcohol Classification:</p>
                    <p className="text-gray-700">"<strong>P</strong>rimary <strong>P</strong>eople <strong>S</strong>econdary <strong>S</strong>chool <strong>T</strong>ertiary <strong>T</strong>eaching" (1°, 2°, 3°)</p>
                  </div>
                  <div className="bg-yellow-100 p-3 rounded">
                    <p className="font-semibold text-yellow-800">Phenol Acidity:</p>
                    <p className="text-gray-700">"<strong>P</strong>henol <strong>P</strong>roduces <strong>R</strong>esonance, <strong>A</strong>lcohol <strong>A</strong>bsent" (Phenol acidic due to resonance)</p>
                  </div>
                  <div className="bg-yellow-100 p-3 rounded">
                    <p className="font-semibold text-yellow-800">Ether Properties:</p>
                    <p className="text-gray-700">"<strong>E</strong>thers <strong>E</strong>asily <strong>E</strong>vaporate" (Low boiling point, no H-bonding)</p>
                  </div>
                </div>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4 border-b-2 border-blue-200 pb-2">6. Quick Revision Points</h2>
              <div className="bg-indigo-50 p-4 rounded-lg">
                <h3 className="text-lg font-bold text-indigo-800 mb-3">⚡ Last-Minute Revision</h3>
                <div className="grid md:grid-cols-2 gap-4 text-sm">
                  <div className="space-y-2">
                    <div className="bg-indigo-100 p-2 rounded">
                      <p className="font-semibold text-indigo-800">Alcohols:</p>
                      <p>• 1°, 2°, 3° classification</p>
                      <p>• Dehydration: E1, E2 mechanisms</p>
                      <p>• Oxidation: 1° → aldehyde → acid</p>
                      <p>• Lucas test for identification</p>
                    </div>
                    <div className="bg-indigo-100 p-2 rounded">
                      <p className="font-semibold text-indigo-800">Important Reactions:</p>
                      <p>• Alcohol + HX → Alkyl halide</p>
                      <p>• Phenol + Br₂ → Tribromophenol</p>
                      <p>• Ether cleavage with HI</p>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="bg-indigo-100 p-2 rounded">
                      <p className="font-semibold text-indigo-800">Phenols:</p>
                      <p>• More acidic than alcohols</p>
                      <p>• Resonance stabilization</p>
                      <p>• Electrophilic substitution</p>
                      <p>• o,p-directing activating group</p>
                    </div>
                    <div className="bg-indigo-100 p-2 rounded">
                      <p className="font-semibold text-indigo-800">Ethers:</p>
                      <p>• Low boiling points</p>
                      <p>• Inert to bases</p>
                      <p>• Cleavage with HI/HBr</p>
                      <p>• Williamson synthesis</p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4 border-b-2 border-blue-200 pb-2">7. Exam Strategy & Tips</h2>
              <div className="bg-orange-50 p-4 rounded-lg">
                <h3 className="text-lg font-bold text-orange-800 mb-3">🎯 Scoring Strategy</h3>
                <div className="space-y-3 text-sm">
                  <div className="bg-orange-100 p-3 rounded">
                    <p className="font-semibold text-orange-800">Time Management (Unit weightage: 6 marks):</p>
                    <p className="text-gray-700">• Structure questions: 2-3 minutes</p>
                    <p className="text-gray-700">• Mechanism questions: 4-5 minutes</p>
                    <p className="text-gray-700">• Comparison questions: 3-4 minutes</p>
                    <p className="text-gray-700">• Always attempt phenol acidity - easy marks!</p>
                  </div>
                  <div className="bg-orange-100 p-3 rounded">
                    <p className="font-semibold text-orange-800">High-Scoring Topics:</p>
                    <p className="text-gray-700">• Phenol vs alcohol acidity (3-5 marks)</p>
                    <p className="text-gray-700">• Alcohol dehydration mechanism (3-5 marks)</p>
                    <p className="text-gray-700">• Ether preparation methods (2-3 marks)</p>
                    <p className="text-gray-700">• Lucas test explanation (2 marks)</p>
                  </div>
                  <div className="bg-orange-100 p-3 rounded">
                    <p className="font-semibold text-orange-800">Answer Writing Tips:</p>
                    <p className="text-gray-700">• Draw clear structural formulas</p>
                    <p className="text-gray-700">• Show resonance structures</p>
                    <p className="text-gray-700">• Include reaction conditions</p>
                    <p className="text-gray-700">• Mention stereochemistry where relevant</p>
                  </div>
                </div>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4 border-b-2 border-blue-200 pb-2">8. Important Formulas & Data</h2>
              <div className="bg-slate-50 p-4 rounded-lg">
                <div className="grid md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <h3 className="font-semibold mb-2 text-slate-800">Key Reactions:</h3>
                    <ul className="space-y-1">
                      <li>• ROH + HX → RX + H₂O</li>
                      <li>• ROH + SOCl₂ → RCl + SO₂ + HCl</li>
                      <li>• C₆H₅OH + 3Br₂ → C₆H₂Br₃OH</li>
                      <li>• ROR' + HI → RI + R'OH</li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2 text-slate-800">Physical Properties:</h3>
                    <ul className="space-y-1">
                      <li>• Alcohols: H-bonding, higher b.p.</li>
                      <li>• Phenols: Weakly acidic (pKa ~10)</li>
                      <li>• Ethers: Low b.p., inert</li>
                      <li>• Solubility decreases with chain length</li>
                    </ul>
                  </div>
                </div>
                <div className="mt-4 bg-slate-100 p-3 rounded">
                  <h3 className="font-semibold mb-2 text-slate-800">Important Data:</h3>
                  <p className="text-sm text-gray-700">Acidity order: Phenol &gt; Water &gt; Alcohols | Boiling point: Alcohols &gt; Ethers (due to H-bonding)</p>
                </div>
              </div>
            </section>
          </div>
          
          <div className="mt-8 text-center">
            <button 
              onClick={downloadPDF}
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Download PDF
            </button>
          </div>
        </div>
      </div>
    </>
  )
}