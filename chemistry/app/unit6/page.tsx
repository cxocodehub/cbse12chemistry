'use client'

import { useRef, useEffect, useState } from 'react'

export default function Unit6() {
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
      
      pdf.save('CBSE-Class12-Chemistry-Unit6-Haloalkanes-Haloarenes.pdf')
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
              <a href="/unit6" className="w-8 h-8 bg-yellow-500 text-white rounded-full flex items-center justify-center text-sm" title="Haloalkanes and Haloarenes">6</a>
              <a href="/unit7" className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm hover:bg-blue-700" title="Alcohols, Phenols and Ethers">7</a>
              <a href="/unit8" className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm hover:bg-blue-700" title="Aldehydes, Ketones and Carboxylic Acids">8</a>
              <a href="/unit9" className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm hover:bg-blue-700" title="Amines">9</a>
              <a href="/unit10" className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm hover:bg-blue-700" title="Biomolecules">10</a>
              <a href="/practical" className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm hover:bg-blue-700" title="Practical">P</a>
            </div>
          </div>
          
          <div ref={notesRef} className="bg-white p-8 rounded-lg shadow-lg">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-blue-800">CBSE Board Class 12 Chemistry</h1>
              <h2 className="text-xl font-semibold text-gray-700 mt-2">Unit 6: Haloalkanes and Haloarenes - Complete Notes</h2>
            </div>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4 border-b-2 border-blue-200 pb-2">1. Haloalkanes - Structure & Nomenclature</h2>
              <div className="bg-blue-50 p-4 rounded-lg mb-4">
                <h3 className="text-lg font-bold text-blue-800 mb-2">Structure & Examples</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="bg-blue-100 p-3 rounded">
                    <p className="text-sm font-semibold text-blue-800 mb-2">Methyl Chloride (CH₃Cl):</p>
                    <div className="text-center">
                      <svg width="120" height="80" viewBox="0 0 120 80" className="mx-auto">
                        <circle cx="60" cy="40" r="8" fill="#000" stroke="#000" strokeWidth="1"/>
                        <text x="60" y="45" fontSize="10" textAnchor="middle" fill="#FFF">C</text>
                        <circle cx="90" cy="40" r="6" fill="#90EE90" stroke="#000" strokeWidth="1"/>
                        <text x="90" y="44" fontSize="8" textAnchor="middle" fill="#000">Cl</text>
                        <circle cx="45" cy="25" r="4" fill="#FFF" stroke="#000" strokeWidth="1"/>
                        <text x="45" y="28" fontSize="6" textAnchor="middle" fill="#000">H</text>
                        <circle cx="45" cy="55" r="4" fill="#FFF" stroke="#000" strokeWidth="1"/>
                        <text x="45" y="58" fontSize="6" textAnchor="middle" fill="#000">H</text>
                        <circle cx="30" cy="40" r="4" fill="#FFF" stroke="#000" strokeWidth="1"/>
                        <text x="30" y="43" fontSize="6" textAnchor="middle" fill="#000">H</text>
                        <line x1="68" y1="40" x2="84" y2="40" stroke="#000" strokeWidth="2"/>
                        <line x1="52" y1="40" x2="49" y2="29" stroke="#000" strokeWidth="1"/>
                        <line x1="52" y1="40" x2="49" y2="51" stroke="#000" strokeWidth="1"/>
                        <line x1="52" y1="40" x2="34" y2="40" stroke="#000" strokeWidth="1"/>
                      </svg>
                    </div>
                    <p className="text-xs text-gray-600 text-center mt-1">Tetrahedral geometry</p>
                  </div>
                  <div className="bg-blue-100 p-3 rounded">
                    <p className="text-sm font-semibold text-blue-800 mb-2">Ethyl Bromide (C₂H₅Br):</p>
                    <div className="text-center">
                      <svg width="150" height="80" viewBox="0 0 150 80" className="mx-auto">
                        <circle cx="40" cy="40" r="8" fill="#000" stroke="#000" strokeWidth="1"/>
                        <text x="40" y="45" fontSize="10" textAnchor="middle" fill="#FFF">C</text>
                        <circle cx="80" cy="40" r="8" fill="#000" stroke="#000" strokeWidth="1"/>
                        <text x="80" y="45" fontSize="10" textAnchor="middle" fill="#FFF">C</text>
                        <circle cx="110" cy="40" r="7" fill="#8B4513" stroke="#000" strokeWidth="1"/>
                        <text x="110" y="44" fontSize="8" textAnchor="middle" fill="#FFF">Br</text>
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
                        <line x1="88" y1="40" x2="103" y2="40" stroke="#000" strokeWidth="2"/>
                        <line x1="32" y1="40" x2="29" y2="29" stroke="#000" strokeWidth="1"/>
                        <line x1="32" y1="40" x2="29" y2="51" stroke="#000" strokeWidth="1"/>
                        <line x1="32" y1="40" x2="14" y2="40" stroke="#000" strokeWidth="1"/>
                        <line x1="80" y1="32" x2="80" y2="24" stroke="#000" strokeWidth="1"/>
                        <line x1="80" y1="48" x2="80" y2="56" stroke="#000" strokeWidth="1"/>
                      </svg>
                    </div>
                    <p className="text-xs text-gray-600 text-center mt-1">Primary haloalkane</p>
                  </div>
                </div>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4 border-b-2 border-blue-200 pb-2">2. Nature of C-X Bond</h2>
              <div className="bg-green-50 p-4 rounded-lg">
                <h3 className="text-lg font-bold text-green-800 mb-2">Bond Characteristics</h3>
                <div className="space-y-3">
                  <div className="bg-green-100 p-3 rounded">
                    <p className="text-sm font-semibold text-green-800">Polarity & Bond Length:</p>
                    <div className="text-center my-3">
                      <svg width="300" height="100" viewBox="0 0 300 100" className="mx-auto">
                        <text x="150" y="20" fontSize="12" textAnchor="middle" fill="#000" fontWeight="bold">C-X Bond Polarity</text>
                        <circle cx="80" cy="50" r="12" fill="#000" stroke="#000" strokeWidth="1"/>
                        <text x="80" y="55" fontSize="12" textAnchor="middle" fill="#FFF">C</text>
                        <text x="80" y="70" fontSize="8" textAnchor="middle" fill="#000">δ+</text>
                        <circle cx="140" cy="50" r="10" fill="#90EE90" stroke="#000" strokeWidth="1"/>
                        <text x="140" y="54" fontSize="10" textAnchor="middle" fill="#000">X</text>
                        <text x="140" y="70" fontSize="8" textAnchor="middle" fill="#000">δ-</text>
                        <line x1="92" y1="50" x2="130" y2="50" stroke="#000" strokeWidth="3"/>
                        <polygon points="125,45 135,50 125,55" fill="#FF0000"/>
                        <text x="200" y="40" fontSize="10" fill="#000">Bond Length Order:</text>
                        <text x="200" y="55" fontSize="10" fill="#000">C-F &lt; C-Cl &lt; C-Br &lt; C-I</text>
                        <text x="200" y="70" fontSize="10" fill="#000">Bond Strength Order:</text>
                        <text x="200" y="85" fontSize="10" fill="#000">C-F &gt; C-Cl &gt; C-Br &gt; C-I</text>
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4 border-b-2 border-blue-200 pb-2">3. Substitution Reactions - SN1 & SN2</h2>
              <div className="space-y-4">
                <div className="bg-yellow-50 p-4 rounded-lg">
                  <h3 className="text-lg font-bold text-yellow-800 mb-2">SN2 Mechanism (Bimolecular)</h3>
                  <div className="bg-yellow-100 p-3 rounded">
                    <p className="text-sm font-semibold text-yellow-800 mb-2">Mechanism: OH⁻ + CH₃Cl → CH₃OH + Cl⁻</p>
                    <div className="text-center">
                      <svg width="400" height="120" viewBox="0 0 400 120" className="mx-auto">
                        <text x="200" y="15" fontSize="12" textAnchor="middle" fill="#000" fontWeight="bold">SN2 Mechanism - Transition State</text>
                        <circle cx="50" cy="60" r="8" fill="#FF0000" stroke="#000" strokeWidth="1"/>
                        <text x="50" y="64" fontSize="10" textAnchor="middle" fill="#FFF">OH</text>
                        <text x="50" y="80" fontSize="8" textAnchor="middle" fill="#000">⁻</text>
                        <circle cx="150" cy="60" r="10" fill="#000" stroke="#000" strokeWidth="1"/>
                        <text x="150" y="65" fontSize="12" textAnchor="middle" fill="#FFF">C</text>
                        <circle cx="200" cy="60" r="8" fill="#90EE90" stroke="#000" strokeWidth="1"/>
                        <text x="200" y="64" fontSize="10" textAnchor="middle" fill="#000">Cl</text>
                        <circle cx="130" cy="35" r="5" fill="#FFF" stroke="#000" strokeWidth="1"/>
                        <text x="130" y="38" fontSize="7" textAnchor="middle" fill="#000">H</text>
                        <circle cx="130" cy="85" r="5" fill="#FFF" stroke="#000" strokeWidth="1"/>
                        <text x="130" y="88" fontSize="7" textAnchor="middle" fill="#000">H</text>
                        <circle cx="170" cy="35" r="5" fill="#FFF" stroke="#000" strokeWidth="1"/>
                        <text x="170" y="38" fontSize="7" textAnchor="middle" fill="#000">H</text>
                        <line x1="58" y1="60" x2="140" y2="60" stroke="#FF0000" strokeWidth="2" strokeDasharray="5,5"/>
                        <line x1="160" y1="60" x2="192" y2="60" stroke="#FF0000" strokeWidth="2" strokeDasharray="5,5"/>
                        <line x1="142" y1="60" x2="135" y2="40" stroke="#000" strokeWidth="1"/>
                        <line x1="142" y1="60" x2="135" y2="80" stroke="#000" strokeWidth="1"/>
                        <line x1="158" y1="60" x2="165" y2="40" stroke="#000" strokeWidth="1"/>
                        <text x="100" y="100" fontSize="10" textAnchor="middle" fill="#000">Nucleophile attacks</text>
                        <text x="100" y="110" fontSize="10" textAnchor="middle" fill="#000">from backside</text>
                        <text x="300" y="50" fontSize="10" fill="#000">• One step mechanism</text>
                        <text x="300" y="65" fontSize="10" fill="#000">• Rate = k[RX][Nu⁻]</text>
                        <text x="300" y="80" fontSize="10" fill="#000">• Inversion of configuration</text>
                        <text x="300" y="95" fontSize="10" fill="#000">• 1° &gt; 2° &gt; 3° reactivity</text>
                      </svg>
                    </div>
                  </div>
                </div>
                <div className="bg-orange-50 p-4 rounded-lg">
                  <h3 className="text-lg font-bold text-orange-800 mb-2">SN1 Mechanism (Unimolecular)</h3>
                  <div className="bg-orange-100 p-3 rounded">
                    <p className="text-sm font-semibold text-orange-800 mb-2">Mechanism: (CH₃)₃CCl → (CH₃)₃C⁺ + Cl⁻ → (CH₃)₃COH</p>
                    <div className="text-center">
                      <svg width="400" height="100" viewBox="0 0 400 100" className="mx-auto">
                        <text x="200" y="15" fontSize="12" textAnchor="middle" fill="#000" fontWeight="bold">SN1 Mechanism - Carbocation Formation</text>
                        <circle cx="80" cy="50" r="10" fill="#000" stroke="#000" strokeWidth="1"/>
                        <text x="80" y="55" fontSize="12" textAnchor="middle" fill="#FFF">C</text>
                        <text x="80" y="70" fontSize="10" textAnchor="middle" fill="#FF0000">⁺</text>
                        <circle cx="60" cy="30" r="6" fill="#000" stroke="#000" strokeWidth="1"/>
                        <text x="60" y="34" fontSize="8" textAnchor="middle" fill="#FFF">CH₃</text>
                        <circle cx="100" cy="30" r="6" fill="#000" stroke="#000" strokeWidth="1"/>
                        <text x="100" y="34" fontSize="8" textAnchor="middle" fill="#FFF">CH₃</text>
                        <circle cx="80" cy="25" r="6" fill="#000" stroke="#000" strokeWidth="1"/>
                        <text x="80" y="29" fontSize="8" textAnchor="middle" fill="#FFF">CH₃</text>
                        <circle cx="150" cy="50" r="8" fill="#90EE90" stroke="#000" strokeWidth="1"/>
                        <text x="150" y="54" fontSize="10" textAnchor="middle" fill="#000">Cl</text>
                        <text x="150" y="70" fontSize="8" textAnchor="middle" fill="#000">⁻</text>
                        <line x1="74" y1="42" x2="66" y2="36" stroke="#000" strokeWidth="1"/>
                        <line x1="86" y1="42" x2="94" y2="36" stroke="#000" strokeWidth="1"/>
                        <line x1="80" y1="40" x2="80" y2="31" stroke="#000" strokeWidth="1"/>
                        <text x="250" y="35" fontSize="10" fill="#000">• Two step mechanism</text>
                        <text x="250" y="50" fontSize="10" fill="#000">• Rate = k[RX]</text>
                        <text x="250" y="65" fontSize="10" fill="#000">• Racemization occurs</text>
                        <text x="250" y="80" fontSize="10" fill="#000">• 3° &gt; 2° &gt; 1° reactivity</text>
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4 border-b-2 border-blue-200 pb-2">4. Haloarenes - Structure & Properties</h2>
              <div className="bg-purple-50 p-4 rounded-lg mb-4">
                <h3 className="text-lg font-bold text-purple-800 mb-2">Chlorobenzene Structure</h3>
                <div className="bg-purple-100 p-3 rounded">
                  <div className="text-center">
                    <svg width="200" height="200" viewBox="0 0 200 200" className="mx-auto">
                      <text x="100" y="20" fontSize="12" textAnchor="middle" fill="#000" fontWeight="bold">Chlorobenzene (C₆H₅Cl)</text>
                      <circle cx="100" cy="60" r="8" fill="#000" stroke="#000" strokeWidth="1"/>
                      <text x="100" y="65" fontSize="10" textAnchor="middle" fill="#FFF">C</text>
                      <circle cx="130" cy="80" r="8" fill="#000" stroke="#000" strokeWidth="1"/>
                      <text x="130" y="85" fontSize="10" textAnchor="middle" fill="#FFF">C</text>
                      <circle cx="130" cy="120" r="8" fill="#000" stroke="#000" strokeWidth="1"/>
                      <text x="130" y="125" fontSize="10" textAnchor="middle" fill="#FFF">C</text>
                      <circle cx="100" cy="140" r="8" fill="#000" stroke="#000" strokeWidth="1"/>
                      <text x="100" y="145" fontSize="10" textAnchor="middle" fill="#FFF">C</text>
                      <circle cx="70" cy="120" r="8" fill="#000" stroke="#000" strokeWidth="1"/>
                      <text x="70" y="125" fontSize="10" textAnchor="middle" fill="#FFF">C</text>
                      <circle cx="70" cy="80" r="8" fill="#000" stroke="#000" strokeWidth="1"/>
                      <text x="70" y="85" fontSize="10" textAnchor="middle" fill="#FFF">C</text>
                      <circle cx="100" cy="35" r="8" fill="#90EE90" stroke="#000" strokeWidth="1"/>
                      <text x="100" y="39" fontSize="10" textAnchor="middle" fill="#000">Cl</text>
                      <circle cx="145" cy="75" r="4" fill="#FFF" stroke="#000" strokeWidth="1"/>
                      <text x="145" y="78" fontSize="6" textAnchor="middle" fill="#000">H</text>
                      <circle cx="145" cy="125" r="4" fill="#FFF" stroke="#000" strokeWidth="1"/>
                      <text x="145" y="128" fontSize="6" textAnchor="middle" fill="#000">H</text>
                      <circle cx="100" cy="155" r="4" fill="#FFF" stroke="#000" strokeWidth="1"/>
                      <text x="100" y="158" fontSize="6" textAnchor="middle" fill="#000">H</text>
                      <circle cx="55" cy="125" r="4" fill="#FFF" stroke="#000" strokeWidth="1"/>
                      <text x="55" y="128" fontSize="6" textAnchor="middle" fill="#000">H</text>
                      <circle cx="55" cy="75" r="4" fill="#FFF" stroke="#000" strokeWidth="1"/>
                      <text x="55" y="78" fontSize="6" textAnchor="middle" fill="#000">H</text>
                      <line x1="100" y1="52" x2="100" y2="43" stroke="#000" strokeWidth="2"/>
                      <line x1="108" y1="68" x2="122" y2="80" stroke="#000" strokeWidth="2"/>
                      <line x1="130" y1="88" x2="130" y2="112" stroke="#000" strokeWidth="1"/>
                      <line x1="122" y1="128" x2="108" y2="132" stroke="#000" strokeWidth="2"/>
                      <line x1="92" y1="132" x2="78" y2="128" stroke="#000" strokeWidth="1"/>
                      <line x1="70" y1="112" x2="70" y2="88" stroke="#000" strokeWidth="2"/>
                      <line x1="78" y1="72" x2="92" y2="68" stroke="#000" strokeWidth="1"/>
                      <line x1="138" y1="80" x2="141" y2="75" stroke="#000" strokeWidth="1"/>
                      <line x1="138" y1="120" x2="141" y2="125" stroke="#000" strokeWidth="1"/>
                      <line x1="100" y1="148" x2="100" y2="151" stroke="#000" strokeWidth="1"/>
                      <line x1="62" y1="120" x2="59" y2="125" stroke="#000" strokeWidth="1"/>
                      <line x1="62" y1="80" x2="59" y2="75" stroke="#000" strokeWidth="1"/>
                    </svg>
                  </div>
                  <p className="text-xs text-gray-600 text-center mt-2">Resonance stabilized benzene ring with Cl substituent</p>
                </div>
              </div>
              <div className="bg-red-50 p-4 rounded-lg">
                <h3 className="text-lg font-bold text-red-800 mb-2">Directive Effects in Substitution</h3>
                <div className="grid md:grid-cols-2 gap-4 text-sm">
                  <div className="bg-red-100 p-3 rounded">
                    <p className="font-semibold text-red-800">Ortho-Para Directing:</p>
                    <p>• Halogen is o,p-directing but deactivating</p>
                    <p>• +R effect &gt; -I effect</p>
                    <p>• Examples: -Cl, -Br, -I</p>
                  </div>
                  <div className="bg-red-100 p-3 rounded">
                    <p className="font-semibold text-red-800">Reaction Example:</p>
                    <p>C₆H₅Cl + HNO₃/H₂SO₄ →</p>
                    <p>o-ClC₆H₄NO₂ + p-ClC₆H₄NO₂</p>
                  </div>
                </div>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4 border-b-2 border-blue-200 pb-2">5. Important Compounds & Environmental Effects</h2>
              <div className="space-y-4">
                <div className="bg-teal-50 p-4 rounded-lg">
                  <h3 className="text-lg font-bold text-teal-800 mb-2">Chloroform (CHCl₃) Structure</h3>
                  <div className="bg-teal-100 p-3 rounded">
                    <div className="text-center">
                      <svg width="150" height="120" viewBox="0 0 150 120" className="mx-auto">
                        <circle cx="75" cy="60" r="10" fill="#000" stroke="#000" strokeWidth="1"/>
                        <text x="75" y="65" fontSize="12" textAnchor="middle" fill="#FFF">C</text>
                        <circle cx="75" cy="30" r="5" fill="#FFF" stroke="#000" strokeWidth="1"/>
                        <text x="75" y="33" fontSize="8" textAnchor="middle" fill="#000">H</text>
                        <circle cx="50" cy="80" r="7" fill="#90EE90" stroke="#000" strokeWidth="1"/>
                        <text x="50" y="84" fontSize="9" textAnchor="middle" fill="#000">Cl</text>
                        <circle cx="100" cy="80" r="7" fill="#90EE90" stroke="#000" strokeWidth="1"/>
                        <text x="100" y="84" fontSize="9" textAnchor="middle" fill="#000">Cl</text>
                        <circle cx="75" cy="95" r="7" fill="#90EE90" stroke="#000" strokeWidth="1"/>
                        <text x="75" y="99" fontSize="9" textAnchor="middle" fill="#000">Cl</text>
                        <line x1="75" y1="50" x2="75" y2="35" stroke="#000" strokeWidth="2"/>
                        <line x1="67" y1="68" x2="57" y2="73" stroke="#000" strokeWidth="2"/>
                        <line x1="83" y1="68" x2="93" y2="73" stroke="#000" strokeWidth="2"/>
                        <line x1="75" y1="70" x2="75" y2="88" stroke="#000" strokeWidth="2"/>
                      </svg>
                    </div>
                    <p className="text-sm text-gray-700 mt-2">• Used as anesthetic (now banned)</p>
                    <p className="text-sm text-gray-700">• Carcinogenic and toxic</p>
                    <p className="text-sm text-gray-700">• Ozone layer depletion</p>
                  </div>
                </div>
                <div className="bg-indigo-50 p-4 rounded-lg">
                  <h3 className="text-lg font-bold text-indigo-800 mb-2">DDT Structure & Environmental Impact</h3>
                  <div className="bg-indigo-100 p-3 rounded">
                    <div className="text-center">
                      <svg width="300" height="150" viewBox="0 0 300 150" className="mx-auto">
                        <text x="150" y="15" fontSize="12" textAnchor="middle" fill="#000" fontWeight="bold">DDT Structure</text>
                        <circle cx="80" cy="50" r="8" fill="#000" stroke="#000" strokeWidth="1"/>
                        <circle cx="110" cy="70" r="8" fill="#000" stroke="#000" strokeWidth="1"/>
                        <circle cx="110" cy="110" r="8" fill="#000" stroke="#000" strokeWidth="1"/>
                        <circle cx="80" cy="130" r="8" fill="#000" stroke="#000" strokeWidth="1"/>
                        <circle cx="50" cy="110" r="8" fill="#000" stroke="#000" strokeWidth="1"/>
                        <circle cx="50" cy="70" r="8" fill="#000" stroke="#000" strokeWidth="1"/>
                        <circle cx="150" cy="90" r="8" fill="#000" stroke="#000" strokeWidth="1"/>
                        <text x="150" y="95" fontSize="10" textAnchor="middle" fill="#FFF">C</text>
                        <circle cx="190" cy="70" r="8" fill="#000" stroke="#000" strokeWidth="1"/>
                        <circle cx="220" cy="50" r="8" fill="#000" stroke="#000" strokeWidth="1"/>
                        <circle cx="250" cy="70" r="8" fill="#000" stroke="#000" strokeWidth="1"/>
                        <circle cx="250" cy="110" r="8" fill="#000" stroke="#000" strokeWidth="1"/>
                        <circle cx="220" cy="130" r="8" fill="#000" stroke="#000" strokeWidth="1"/>
                        <circle cx="190" cy="110" r="8" fill="#000" stroke="#000" strokeWidth="1"/>
                        <circle cx="30" cy="50" r="6" fill="#90EE90" stroke="#000" strokeWidth="1"/>
                        <text x="30" y="54" fontSize="8" textAnchor="middle" fill="#000">Cl</text>
                        <circle cx="30" cy="130" r="6" fill="#90EE90" stroke="#000" strokeWidth="1"/>
                        <text x="30" y="134" fontSize="8" textAnchor="middle" fill="#000">Cl</text>
                        <circle x="270" cy="50" r="6" fill="#90EE90" stroke="#000" strokeWidth="1"/>
                        <text x="270" y="54" fontSize="8" textAnchor="middle" fill="#000">Cl</text>
                        <circle cx="270" cy="130" r="6" fill="#90EE90" stroke="#000" strokeWidth="1"/>
                        <text x="270" y="134" fontSize="8" textAnchor="middle" fill="#000">Cl</text>
                        <circle cx="150" cy="60" r="5" fill="#FFF" stroke="#000" strokeWidth="1"/>
                        <text x="150" y="63" fontSize="7" textAnchor="middle" fill="#000">H</text>
                        <line x1="118" y1="90" x2="142" y2="90" stroke="#000" strokeWidth="2"/>
                        <line x1="158" y1="90" x2="182" y2="90" stroke="#000" strokeWidth="2"/>
                        <line x1="150" y1="82" x2="150" y2="65" stroke="#000" strokeWidth="1"/>
                      </svg>
                    </div>
                    <p className="text-sm text-gray-700 mt-2">• Persistent organic pollutant</p>
                    <p className="text-sm text-gray-700">• Bioaccumulation in food chain</p>
                    <p className="text-sm text-gray-700">• Banned in many countries</p>
                  </div>
                </div>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4 border-b-2 border-blue-200 pb-2">6. Previous Years' Board Questions</h2>
              <div className="space-y-4">
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h3 className="font-bold mb-3 text-blue-800">1 Mark Questions (MCQs):</h3>
                  <div className="space-y-2 text-sm">
                    <div className="bg-blue-100 p-2 rounded">
                      <p><strong>Q1.</strong> SN2 reaction shows: (a) Retention (b) Inversion (c) Racemization</p>
                      <p className="text-green-600 font-semibold">Answer: (b) Inversion</p>
                    </div>
                    <div className="bg-blue-100 p-2 rounded">
                      <p><strong>Q2.</strong> Chlorobenzene is: (a) o,p-directing (b) m-directing (c) No effect</p>
                      <p className="text-green-600 font-semibold">Answer: (a) o,p-directing</p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-green-50 p-4 rounded-lg">
                  <h3 className="font-bold mb-3 text-green-800">2-3 Mark Questions:</h3>
                  <div className="space-y-3 text-sm">
                    <div className="bg-green-100 p-3 rounded">
                      <p className="font-semibold">Q1. Distinguish between SN1 and SN2 mechanisms.</p>
                      <p className="text-gray-700 mt-1"><strong>Answer:</strong> SN1: Two steps, carbocation intermediate, racemization. SN2: One step, backside attack, inversion.</p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4 border-b-2 border-blue-200 pb-2">7. Memory Techniques & Mnemonics</h2>
              <div className="bg-yellow-50 p-4 rounded-lg">
                <h3 className="text-lg font-bold text-yellow-800 mb-3">🧠 Smart Memory Tricks</h3>
                <div className="space-y-3 text-sm">
                  <div className="bg-yellow-100 p-3 rounded">
                    <p className="font-semibold text-yellow-800">SN1 vs SN2:</p>
                    <p className="text-gray-700">"<strong>SN1</strong> = <strong>S</strong>low <strong>N</strong>ucleophile <strong>1</strong> step visible, <strong>SN2</strong> = <strong>S</strong>peedy <strong>N</strong>ucleophile <strong>2</strong> molecules"</p>
                  </div>
                  <div className="bg-yellow-100 p-3 rounded">
                    <p className="font-semibold text-yellow-800">Reactivity Order:</p>
                    <p className="text-gray-700">"<strong>SN1:</strong> <strong>T</strong>ertiary <strong>T</strong>ops, <strong>SN2:</strong> <strong>P</strong>rimary <strong>P</strong>referred"</p>
                  </div>
                  <div className="bg-yellow-100 p-3 rounded">
                    <p className="font-semibold text-yellow-800">Halogen Bond Strength:</p>
                    <p className="text-gray-700">"<strong>F</strong>luorine <strong>F</strong>irmly <strong>C</strong>lings, <strong>I</strong>odine <strong>I</strong>s <strong>L</strong>oose" (C-F strongest, C-I weakest)</p>
                  </div>
                </div>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4 border-b-2 border-blue-200 pb-2">8. Quick Revision Points</h2>
              <div className="bg-indigo-50 p-4 rounded-lg">
                <h3 className="text-lg font-bold text-indigo-800 mb-3">⚡ Last-Minute Revision</h3>
                <div className="grid md:grid-cols-2 gap-4 text-sm">
                  <div className="space-y-2">
                    <div className="bg-indigo-100 p-2 rounded">
                      <p className="font-semibold text-indigo-800">Key Mechanisms:</p>
                      <p>• SN1: Two steps, carbocation</p>
                      <p>• SN2: One step, backside attack</p>
                      <p>• E1: Elimination, carbocation</p>
                      <p>• E2: Elimination, concerted</p>
                    </div>
                    <div className="bg-indigo-100 p-2 rounded">
                      <p className="font-semibold text-indigo-800">Important Compounds:</p>
                      <p>• CHCl₃: Chloroform</p>
                      <p>• CCl₄: Carbon tetrachloride</p>
                      <p>• DDT: Insecticide</p>
                      <p>• Freons: Refrigerants</p>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="bg-indigo-100 p-2 rounded">
                      <p className="font-semibold text-indigo-800">Haloarenes:</p>
                      <p>• Less reactive than haloalkanes</p>
                      <p>• Resonance stabilization</p>
                      <p>• o,p-directing but deactivating</p>
                      <p>• Nucleophilic substitution difficult</p>
                    </div>
                    <div className="bg-indigo-100 p-2 rounded">
                      <p className="font-semibold text-indigo-800">Environmental Effects:</p>
                      <p>• Ozone depletion (CFCs)</p>
                      <p>• Bioaccumulation (DDT)</p>
                      <p>• Carcinogenic effects</p>
                      <p>• Persistent pollutants</p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4 border-b-2 border-blue-200 pb-2">9. Exam Strategy & Tips</h2>
              <div className="bg-orange-50 p-4 rounded-lg">
                <h3 className="text-lg font-bold text-orange-800 mb-3">🎯 Scoring Strategy</h3>
                <div className="space-y-3 text-sm">
                  <div className="bg-orange-100 p-3 rounded">
                    <p className="font-semibold text-orange-800">Time Management (Unit weightage: 6 marks):</p>
                    <p className="text-gray-700">• Mechanism questions: 4-5 minutes</p>
                    <p className="text-gray-700">• Structure drawing: 2-3 minutes</p>
                    <p className="text-gray-700">• Comparison questions: 3-4 minutes</p>
                    <p className="text-gray-700">• Always attempt SN1/SN2 - frequently asked!</p>
                  </div>
                  <div className="bg-orange-100 p-3 rounded">
                    <p className="font-semibold text-orange-800">High-Scoring Topics:</p>
                    <p className="text-gray-700">• SN1 vs SN2 mechanisms (3-5 marks)</p>
                    <p className="text-gray-700">• Haloarene reactions (2-3 marks)</p>
                    <p className="text-gray-700">• Environmental effects (2-3 marks)</p>
                    <p className="text-gray-700">• Structure and nomenclature (2 marks)</p>
                  </div>
                  <div className="bg-orange-100 p-3 rounded">
                    <p className="font-semibold text-orange-800">Answer Writing Tips:</p>
                    <p className="text-gray-700">• Draw clear mechanism arrows</p>
                    <p className="text-gray-700">• Show intermediate structures</p>
                    <p className="text-gray-700">• Include stereochemistry</p>
                    <p className="text-gray-700">• Mention rate equations</p>
                  </div>
                </div>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4 border-b-2 border-blue-200 pb-2">10. Important Formulas & Data</h2>
              <div className="bg-slate-50 p-4 rounded-lg">
                <div className="grid md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <h3 className="font-semibold mb-2 text-slate-800">Rate Equations:</h3>
                    <ul className="space-y-1">
                      <li>• SN1: Rate = k[RX]</li>
                      <li>• SN2: Rate = k[RX][Nu⁻]</li>
                      <li>• E1: Rate = k[RX]</li>
                      <li>• E2: Rate = k[RX][Base]</li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2 text-slate-800">Bond Data:</h3>
                    <ul className="space-y-1">
                      <li>• C-F: 485 kJ/mol (strongest)</li>
                      <li>• C-Cl: 327 kJ/mol</li>
                      <li>• C-Br: 285 kJ/mol</li>
                      <li>• C-I: 213 kJ/mol (weakest)</li>
                    </ul>
                  </div>
                </div>
                <div className="mt-4 bg-slate-100 p-3 rounded">
                  <h3 className="font-semibold mb-2 text-slate-800">Important Data:</h3>
                  <p className="text-sm text-gray-700">Electronegativity: F(4.0) &gt; Cl(3.0) &gt; Br(2.8) &gt; I(2.5) | Bond polarity decreases: C-F &gt; C-Cl &gt; C-Br &gt; C-I</p>
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