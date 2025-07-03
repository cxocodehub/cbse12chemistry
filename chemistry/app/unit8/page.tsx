'use client'

import { useRef, useEffect, useState } from 'react'

export default function Unit8() {
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
      
      pdf.save('CBSE-Class12-Chemistry-Unit8-Aldehydes-Ketones-Carboxylic-Acids.pdf')
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
              <a href="/unit7" className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm hover:bg-blue-700" title="Alcohols, Phenols and Ethers">7</a>
              <a href="/unit8" className="w-8 h-8 bg-yellow-500 text-white rounded-full flex items-center justify-center text-sm" title="Aldehydes, Ketones and Carboxylic Acids">8</a>
              <a href="/unit9" className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm hover:bg-blue-700" title="Amines">9</a>
              <a href="/unit10" className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm hover:bg-blue-700" title="Biomolecules">10</a>
              <a href="/practical" className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm hover:bg-blue-700" title="Practical">P</a>
            </div>
          </div>
          
          <div ref={notesRef} className="bg-white p-8 rounded-lg shadow-lg">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-blue-800">CBSE Board Class 12 Chemistry</h1>
              <h2 className="text-xl font-semibold text-gray-700 mt-2">Unit 8: Aldehydes, Ketones and Carboxylic Acids - Complete Notes</h2>
            </div>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4 border-b-2 border-blue-200 pb-2">1. Carbonyl Compounds - Structure</h2>
              <div className="bg-blue-50 p-4 rounded-lg mb-4">
                <h3 className="text-lg font-bold text-blue-800 mb-2">Aldehyde & Ketone Structures</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="bg-blue-100 p-3 rounded">
                    <p className="text-sm font-semibold text-blue-800 mb-2">Formaldehyde (HCHO):</p>
                    <div className="text-center">
                      <svg width="120" height="80" viewBox="0 0 120 80" className="mx-auto">
                        <circle cx="60" cy="40" r="8" fill="#000" stroke="#000" strokeWidth="1"/>
                        <text x="60" y="45" fontSize="10" textAnchor="middle" fill="#FFF">C</text>
                        <circle cx="90" cy="40" r="6" fill="#FF0000" stroke="#000" strokeWidth="1"/>
                        <text x="90" y="44" fontSize="8" textAnchor="middle" fill="#FFF">O</text>
                        <circle cx="45" cy="25" r="4" fill="#FFF" stroke="#000" strokeWidth="1"/>
                        <text x="45" y="28" fontSize="6" textAnchor="middle" fill="#000">H</text>
                        <circle cx="45" cy="55" r="4" fill="#FFF" stroke="#000" strokeWidth="1"/>
                        <text x="45" y="58" fontSize="6" textAnchor="middle" fill="#000">H</text>
                        <line x1="68" y1="40" x2="84" y2="40" stroke="#000" strokeWidth="3"/>
                        <line x1="52" y1="40" x2="49" y2="29" stroke="#000" strokeWidth="1"/>
                        <line x1="52" y1="40" x2="49" y2="51" stroke="#000" strokeWidth="1"/>
                        <text x="60" y="70" fontSize="8" textAnchor="middle" fill="#000">Aldehyde</text>
                      </svg>
                    </div>
                  </div>
                  <div className="bg-blue-100 p-3 rounded">
                    <p className="text-sm font-semibold text-blue-800 mb-2">Acetone (CH₃COCH₃):</p>
                    <div className="text-center">
                      <svg width="160" height="80" viewBox="0 0 160 80" className="mx-auto">
                        <circle cx="50" cy="40" r="6" fill="#000" stroke="#000" strokeWidth="1"/>
                        <text x="50" y="44" fontSize="8" textAnchor="middle" fill="#FFF">CH₃</text>
                        <circle cx="80" cy="40" r="8" fill="#000" stroke="#000" strokeWidth="1"/>
                        <text x="80" y="45" fontSize="10" textAnchor="middle" fill="#FFF">C</text>
                        <circle cx="110" cy="40" r="6" fill="#FF0000" stroke="#000" strokeWidth="1"/>
                        <text x="110" y="44" fontSize="8" textAnchor="middle" fill="#FFF">O</text>
                        <circle cx="130" cy="40" r="6" fill="#000" stroke="#000" strokeWidth="1"/>
                        <text x="130" y="44" fontSize="8" textAnchor="middle" fill="#FFF">CH₃</text>
                        <line x1="56" y1="40" x2="72" y2="40" stroke="#000" strokeWidth="2"/>
                        <line x1="88" y1="40" x2="104" y2="40" stroke="#000" strokeWidth="3"/>
                        <line x1="116" y1="40" x2="124" y2="40" stroke="#000" strokeWidth="2"/>
                        <text x="80" y="70" fontSize="8" textAnchor="middle" fill="#000">Ketone</text>
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-green-50 p-4 rounded-lg">
                <h3 className="text-lg font-bold text-green-800 mb-2">Carbonyl Group Properties</h3>
                <div className="text-center">
                  <svg width="200" height="100" viewBox="0 0 200 100" className="mx-auto">
                    <text x="100" y="20" fontSize="12" textAnchor="middle" fill="#000" fontWeight="bold">C=O Bond Polarity</text>
                    <circle cx="80" cy="50" r="10" fill="#000" stroke="#000" strokeWidth="1"/>
                    <text x="80" y="55" fontSize="12" textAnchor="middle" fill="#FFF">C</text>
                    <text x="80" y="75" fontSize="10" textAnchor="middle" fill="#000">δ+</text>
                    <circle cx="120" cy="50" r="8" fill="#FF0000" stroke="#000" strokeWidth="1"/>
                    <text x="120" y="54" fontSize="10" textAnchor="middle" fill="#FFF">O</text>
                    <text x="120" y="75" fontSize="10" textAnchor="middle" fill="#000">δ-</text>
                    <line x1="90" y1="50" x2="112" y2="50" stroke="#000" strokeWidth="3"/>
                    <line x1="90" y1="46" x2="112" y2="46" stroke="#000" strokeWidth="1"/>
                    <polygon points="108,45 118,50 108,55" fill="#FF0000"/>
                    <text x="100" y="90" fontSize="8" textAnchor="middle" fill="#000">Electrophilic carbon</text>
                  </svg>
                </div>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4 border-b-2 border-blue-200 pb-2">2. Nucleophilic Addition Reactions</h2>
              <div className="bg-yellow-50 p-4 rounded-lg">
                <h3 className="text-lg font-bold text-yellow-800 mb-2">Addition Mechanism</h3>
                <div className="bg-yellow-100 p-3 rounded">
                  <div className="text-center">
                    <svg width="400" height="120" viewBox="0 0 400 120" className="mx-auto">
                      <text x="200" y="15" fontSize="12" textAnchor="middle" fill="#000" fontWeight="bold">Nucleophilic Addition to C=O</text>
                      <circle cx="60" cy="50" r="8" fill="#000" stroke="#000" strokeWidth="1"/>
                      <text x="60" y="55" fontSize="10" textAnchor="middle" fill="#FFF">C</text>
                      <circle cx="90" cy="50" r="6" fill="#FF0000" stroke="#000" strokeWidth="1"/>
                      <text x="90" y="54" fontSize="8" textAnchor="middle" fill="#FFF">O</text>
                      <circle cx="30" cy="70" r="6" fill="#0000FF" stroke="#000" strokeWidth="1"/>
                      <text x="30" y="74" fontSize="8" textAnchor="middle" fill="#FFF">Nu⁻</text>
                      <text x="120" y="55" fontSize="16" textAnchor="middle" fill="#000">→</text>
                      <circle cx="180" cy="50" r="8" fill="#000" stroke="#000" strokeWidth="1"/>
                      <text x="180" y="55" fontSize="10" textAnchor="middle" fill="#FFF">C</text>
                      <circle cx="210" cy="50" r="6" fill="#FF0000" stroke="#000" strokeWidth="1"/>
                      <text x="210" y="54" fontSize="8" textAnchor="middle" fill="#FFF">O⁻</text>
                      <circle cx="160" cy="70" r="6" fill="#0000FF" stroke="#000" strokeWidth="1"/>
                      <text x="160" y="74" fontSize="8" textAnchor="middle" fill="#FFF">Nu</text>
                      <text x="250" y="55" fontSize="16" textAnchor="middle" fill="#000">→</text>
                      <circle cx="310" cy="50" r="8" fill="#000" stroke="#000" strokeWidth="1"/>
                      <text x="310" y="55" fontSize="10" textAnchor="middle" fill="#FFF">C</text>
                      <circle cx="340" cy="50" r="6" fill="#FF0000" stroke="#000" strokeWidth="1"/>
                      <text x="340" y="54" fontSize="8" textAnchor="middle" fill="#FFF">OH</text>
                      <circle cx="290" cy="70" r="6" fill="#0000FF" stroke="#000" strokeWidth="1"/>
                      <text x="290" y="74" fontSize="8" textAnchor="middle" fill="#FFF">Nu</text>
                      <line x1="68" y1="50" x2="84" y2="50" stroke="#000" strokeWidth="3"/>
                      <line x1="36" y1="64" x2="54" y2="56" stroke="#FF0000" strokeWidth="2" strokeDasharray="3,3"/>
                      <line x1="172" y1="50" x2="204" y2="50" stroke="#000" strokeWidth="2"/>
                      <line x1="166" y1="64" x2="174" y2="56" stroke="#000" strokeWidth="2"/>
                      <line x1="302" y1="50" x2="334" y2="50" stroke="#000" strokeWidth="2"/>
                      <line x1="296" y1="64" x2="304" y2="56" stroke="#000" strokeWidth="2"/>
                      <text x="200" y="100" fontSize="10" textAnchor="middle" fill="#000">Step 1: Nu⁻ attacks C=O    Step 2: Protonation</text>
                    </svg>
                  </div>
                </div>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4 border-b-2 border-blue-200 pb-2">3. Carboxylic Acids - Structure & Properties</h2>
              <div className="bg-purple-50 p-4 rounded-lg mb-4">
                <h3 className="text-lg font-bold text-purple-800 mb-2">Carboxylic Acid Structure</h3>
                <div className="bg-purple-100 p-3 rounded">
                  <div className="text-center">
                    <svg width="200" height="120" viewBox="0 0 200 120" className="mx-auto">
                      <text x="100" y="20" fontSize="12" textAnchor="middle" fill="#000" fontWeight="bold">Acetic Acid (CH₃COOH)</text>
                      <circle cx="60" cy="60" r="6" fill="#000" stroke="#000" strokeWidth="1"/>
                      <text x="60" y="64" fontSize="8" textAnchor="middle" fill="#FFF">CH₃</text>
                      <circle cx="90" cy="60" r="8" fill="#000" stroke="#000" strokeWidth="1"/>
                      <text x="90" y="65" fontSize="10" textAnchor="middle" fill="#FFF">C</text>
                      <circle cx="120" cy="45" r="6" fill="#FF0000" stroke="#000" strokeWidth="1"/>
                      <text x="120" y="49" fontSize="8" textAnchor="middle" fill="#FFF">O</text>
                      <circle cx="120" cy="75" r="6" fill="#FF0000" stroke="#000" strokeWidth="1"/>
                      <text x="120" y="79" fontSize="8" textAnchor="middle" fill="#FFF">O</text>
                      <circle cx="140" cy="75" r="4" fill="#FFF" stroke="#000" strokeWidth="1"/>
                      <text x="140" y="78" fontSize="6" textAnchor="middle" fill="#000">H</text>
                      <line x1="66" y1="60" x2="82" y2="60" stroke="#000" strokeWidth="2"/>
                      <line x1="98" y1="60" x2="114" y2="49" stroke="#000" strokeWidth="3"/>
                      <line x1="98" y1="60" x2="114" y2="71" stroke="#000" strokeWidth="2"/>
                      <line x1="126" y1="75" x2="136" y2="75" stroke="#000" strokeWidth="1"/>
                      <text x="100" y="100" fontSize="10" textAnchor="middle" fill="#000">Carboxyl group (-COOH)</text>
                    </svg>
                  </div>
                  <p className="text-xs text-gray-600 text-center mt-2">Resonance stabilized carboxylate ion makes acids acidic</p>
                </div>
              </div>
              <div className="bg-red-50 p-4 rounded-lg">
                <h3 className="text-lg font-bold text-red-800 mb-2">Carboxylate Ion Resonance</h3>
                <div className="bg-red-100 p-3 rounded">
                  <div className="text-center">
                    <svg width="300" height="100" viewBox="0 0 300 100" className="mx-auto">
                      <text x="150" y="15" fontSize="12" textAnchor="middle" fill="#000" fontWeight="bold">CH₃COO⁻ Resonance</text>
                      <circle cx="60" cy="50" r="6" fill="#000" stroke="#000" strokeWidth="1"/>
                      <text x="60" y="54" fontSize="8" textAnchor="middle" fill="#FFF">CH₃</text>
                      <circle cx="90" cy="50" r="8" fill="#000" stroke="#000" strokeWidth="1"/>
                      <text x="90" y="55" fontSize="10" textAnchor="middle" fill="#FFF">C</text>
                      <circle cx="120" cy="35" r="6" fill="#FF0000" stroke="#000" strokeWidth="1"/>
                      <text x="120" y="39" fontSize="8" textAnchor="middle" fill="#FFF">O⁻</text>
                      <circle cx="120" cy="65" r="6" fill="#FF0000" stroke="#000" strokeWidth="1"/>
                      <text x="120" y="69" fontSize="8" textAnchor="middle" fill="#FFF">O</text>
                      <text x="150" y="55" fontSize="16" textAnchor="middle" fill="#000">↔</text>
                      <circle cx="180" cy="50" r="6" fill="#000" stroke="#000" strokeWidth="1"/>
                      <text x="180" y="54" fontSize="8" textAnchor="middle" fill="#FFF">CH₃</text>
                      <circle cx="210" cy="50" r="8" fill="#000" stroke="#000" strokeWidth="1"/>
                      <text x="210" y="55" fontSize="10" textAnchor="middle" fill="#FFF">C</text>
                      <circle cx="240" cy="35" r="6" fill="#FF0000" stroke="#000" strokeWidth="1"/>
                      <text x="240" y="39" fontSize="8" textAnchor="middle" fill="#FFF">O</text>
                      <circle cx="240" cy="65" r="6" fill="#FF0000" stroke="#000" strokeWidth="1"/>
                      <text x="240" y="69" fontSize="8" textAnchor="middle" fill="#FFF">O⁻</text>
                      <line x1="66" y1="50" x2="82" y2="50" stroke="#000" strokeWidth="2"/>
                      <line x1="98" y1="50" x2="114" y2="39" stroke="#000" strokeWidth="2"/>
                      <line x1="98" y1="50" x2="114" y2="61" stroke="#000" strokeWidth="3"/>
                      <line x1="186" y1="50" x2="202" y2="50" stroke="#000" strokeWidth="2"/>
                      <line x1="218" y1="50" x2="234" y2="39" stroke="#000" strokeWidth="3"/>
                      <line x1="218" y1="50" x2="234" y2="61" stroke="#000" strokeWidth="2"/>
                      <text x="150" y="90" fontSize="10" textAnchor="middle" fill="#000">Equal C-O bond lengths due to resonance</text>
                    </svg>
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
                      <p><strong>Q1.</strong> Aldehydes are more reactive than ketones due to: (a) Electronic effect (b) Steric effect (c) Both</p>
                      <p className="text-green-600 font-semibold">Answer: (c) Both</p>
                    </div>
                    <div className="bg-blue-100 p-2 rounded">
                      <p><strong>Q2.</strong> Carboxylic acids are acidic due to: (a) Induction (b) Resonance (c) Hyperconjugation</p>
                      <p className="text-green-600 font-semibold">Answer: (b) Resonance</p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-green-50 p-4 rounded-lg">
                  <h3 className="font-bold mb-3 text-green-800">2-3 Mark Questions:</h3>
                  <div className="space-y-3 text-sm">
                    <div className="bg-green-100 p-3 rounded">
                      <p className="font-semibold">Q1. Explain nucleophilic addition reaction of aldehydes.</p>
                      <p className="text-gray-700 mt-1"><strong>Answer:</strong> Nucleophile attacks electrophilic carbon of C=O, forming tetrahedral intermediate, followed by protonation.</p>
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
                    <p className="font-semibold text-yellow-800">Aldehyde vs Ketone:</p>
                    <p className="text-gray-700">"<strong>A</strong>ldehyde <strong>A</strong>t <strong>E</strong>nd, <strong>K</strong>etone in <strong>M</strong>iddle" (CHO at end, C=O in middle)</p>
                  </div>
                  <div className="bg-yellow-100 p-3 rounded">
                    <p className="font-semibold text-yellow-800">Reactivity Order:</p>
                    <p className="text-gray-700">"<strong>A</strong>ldehydes <strong>A</strong>re <strong>M</strong>ore <strong>R</strong>eactive" (Less steric hindrance)</p>
                  </div>
                  <div className="bg-yellow-100 p-3 rounded">
                    <p className="font-semibold text-yellow-800">Carboxylic Acid Acidity:</p>
                    <p className="text-gray-700">"<strong>C</strong>arboxylate <strong>R</strong>esonance <strong>S</strong>tabilizes" (COOH acidic due to resonance)</p>
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
                      <p className="font-semibold text-indigo-800">Aldehydes & Ketones:</p>
                      <p>• Nucleophilic addition reactions</p>
                      <p>• Aldol condensation</p>
                      <p>• Cannizzaro reaction</p>
                      <p>• Oxidation: Aldehyde → Acid</p>
                    </div>
                    <div className="bg-indigo-100 p-2 rounded">
                      <p className="font-semibold text-indigo-800">Important Tests:</p>
                      <p>• Tollens' test (silver mirror)</p>
                      <p>• Fehling's test (red ppt)</p>
                      <p>• Benedict's test</p>
                      <p>• Iodoform test</p>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="bg-indigo-100 p-2 rounded">
                      <p className="font-semibold text-indigo-800">Carboxylic Acids:</p>
                      <p>• Acidic nature (pKa ~4-5)</p>
                      <p>• Salt formation</p>
                      <p>• Esterification</p>
                      <p>• Decarboxylation</p>
                    </div>
                    <div className="bg-indigo-100 p-2 rounded">
                      <p className="font-semibold text-indigo-800">Alpha Hydrogen:</p>
                      <p>• Acidic due to keto-enol tautomerism</p>
                      <p>• Aldol condensation</p>
                      <p>• Halogenation reactions</p>
                      <p>• Enolate ion formation</p>
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
                    <p className="font-semibold text-orange-800">Time Management (Unit weightage: 8 marks):</p>
                    <p className="text-gray-700">• Mechanism questions: 5-6 minutes</p>
                    <p className="text-gray-700">• Structure and naming: 2-3 minutes</p>
                    <p className="text-gray-700">• Test identification: 3-4 minutes</p>
                    <p className="text-gray-700">• Always attempt nucleophilic addition - high scoring!</p>
                  </div>
                  <div className="bg-orange-100 p-3 rounded">
                    <p className="font-semibold text-orange-800">High-Scoring Topics:</p>
                    <p className="text-gray-700">• Nucleophilic addition mechanism (5 marks)</p>
                    <p className="text-gray-700">• Aldol condensation (3-5 marks)</p>
                    <p className="text-gray-700">• Carboxylic acid properties (3-5 marks)</p>
                    <p className="text-gray-700">• Distinguishing tests (2-3 marks)</p>
                  </div>
                  <div className="bg-orange-100 p-3 rounded">
                    <p className="font-semibold text-orange-800">Answer Writing Tips:</p>
                    <p className="text-gray-700">• Draw clear mechanism arrows</p>
                    <p className="text-gray-700">• Show intermediate structures</p>
                    <p className="text-gray-700">• Include reaction conditions</p>
                    <p className="text-gray-700">• Mention stereochemistry</p>
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
                      <li>• RCHO + HCN → RCH(OH)CN</li>
                      <li>• RCHO + NH₂OH → RCH=NOH</li>
                      <li>• 2RCHO → RCH(OH)CHO (Aldol)</li>
                      <li>• RCOOH + ROH → RCOOR + H₂O</li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2 text-slate-800">Physical Properties:</h3>
                    <ul className="space-y-1">
                      <li>• C=O bond length: 1.23 Å</li>
                      <li>• Bond angle: ~120° (sp² hybrid)</li>
                      <li>• Dipole moment: C=O polar</li>
                      <li>• H-bonding in carboxylic acids</li>
                    </ul>
                  </div>
                </div>
                <div className="mt-4 bg-slate-100 p-3 rounded">
                  <h3 className="font-semibold mb-2 text-slate-800">Important Data:</h3>
                  <p className="text-sm text-gray-700">Reactivity: HCHO &gt; RCHO &gt; RCOR' | Acidity: RCOOH (pKa ~4-5) &gt; ROH (pKa ~16) | Boiling point: RCOOH &gt; RCHO (H-bonding)</p>
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