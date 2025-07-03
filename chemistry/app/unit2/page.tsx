'use client'

import { useRef, useEffect, useState } from 'react'

export default function Unit2() {
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
      
      pdf.save('CBSE-Class12-Chemistry-Unit2-Electrochemistry.pdf')
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
              <a href="/unit2" className="w-8 h-8 bg-yellow-500 text-white rounded-full flex items-center justify-center text-sm" title="Electrochemistry">2</a>
              <a href="/unit3" className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm hover:bg-blue-700" title="Chemical Kinetics">3</a>
              <a href="/unit4" className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm hover:bg-blue-700" title="d-and f-Block Elements">4</a>
              <a href="/unit5" className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm hover:bg-blue-700" title="Coordination Compounds">5</a>
              <a href="/unit6" className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm hover:bg-blue-700" title="Haloalkanes and Haloarenes">6</a>
              <a href="/unit7" className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm hover:bg-blue-700" title="Alcohols, Phenols and Ethers">7</a>
              <a href="/unit8" className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm hover:bg-blue-700" title="Aldehydes, Ketones and Carboxylic Acids">8</a>
              <a href="/unit9" className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm hover:bg-blue-700" title="Amines">9</a>
              <a href="/unit10" className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm hover:bg-blue-700" title="Biomolecules">10</a>
              <a href="/practical" className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm hover:bg-blue-700" title="Practical">P</a>
            </div>
          </div>
          
          <div ref={notesRef} className="bg-white p-8 rounded-lg shadow-lg">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-blue-800">CBSE Class 12 Chemistry</h1>
              <h2 className="text-xl font-semibold text-gray-700 mt-2">Unit 2: Electrochemistry - Complete Notes</h2>
            </div>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4 border-b-2 border-blue-200 pb-2">1. Redox Reactions & Electrochemical Cells</h2>
              <div className="bg-blue-50 p-4 rounded-lg mb-4">
                <h3 className="text-lg font-bold text-blue-800 mb-2">Redox Reactions</h3>
                <p className="text-sm mb-2">Reactions involving transfer of electrons</p>
                <div className="bg-blue-100 p-3 rounded mt-2">
                  <p className="text-sm font-semibold text-blue-800 mb-1">Example:</p>
                  <p className="text-sm text-gray-700">Zn + Cu²⁺ → Zn²⁺ + Cu</p>
                  <p className="text-sm text-gray-900">Oxidation: Zn → Zn²⁺ + 2e⁻ (Loss of electrons)<br/>Reduction: Cu²⁺ + 2e⁻ → Cu (Gain of electrons)</p>
                </div>
              </div>
              <div className="bg-indigo-50 p-4 rounded-lg">
                <h3 className="text-lg font-bold text-indigo-800 mb-2">Galvanic vs Electrolytic Cells</h3>
                <div className="grid md:grid-cols-2 gap-4 text-sm">
                  <div className="bg-indigo-100 p-3 rounded">
                    <p className="font-semibold text-indigo-800">Galvanic Cell:</p>
                    <p>• Spontaneous reaction (ΔG &lt; 0)</p>
                    <p>• Chemical → Electrical energy</p>
                    <p>• E°cell &gt; 0</p>
                    <p>• Anode (-), Cathode (+)</p>
                  </div>
                  <div className="bg-indigo-100 p-3 rounded">
                    <p className="font-semibold text-indigo-800">Electrolytic Cell:</p>
                    <p>• Non-spontaneous (ΔG &gt; 0)</p>
                    <p>• Electrical → Chemical energy</p>
                    <p>• External voltage required</p>
                    <p>• Anode (+), Cathode (-)</p>
                  </div>
                </div>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4 border-b-2 border-blue-200 pb-2">2. EMF & Standard Electrode Potential</h2>
              <div className="bg-yellow-50 p-4 rounded-lg mb-4">
                <h3 className="text-lg font-bold text-yellow-800 mb-2">Standard Electrode Potential (E°)</h3>
                <p className="text-sm mb-2">Potential of electrode measured against SHE at standard conditions</p>
                <div className="bg-yellow-100 p-3 rounded mt-2">
                  <p className="text-sm font-semibold text-yellow-800 mb-1">Standard Conditions:</p>
                  <p className="text-sm text-gray-700">• 298K temperature • 1 bar pressure • 1M concentration</p>
                  <p className="text-sm text-gray-900 font-semibold mt-2">E°cell = E°cathode - E°anode</p>
                </div>
              </div>
              <div className="bg-orange-50 p-4 rounded-lg">
                <h3 className="text-lg font-bold text-orange-800 mb-2">Important E° Values</h3>
                <div className="text-sm space-y-1">
                  <p>Li⁺/Li: -3.05V | K⁺/K: -2.92V | Ca²⁺/Ca: -2.87V</p>
                  <p>Zn²⁺/Zn: -0.76V | H⁺/H₂: 0.00V | Cu²⁺/Cu: +0.34V</p>
                  <p>Ag⁺/Ag: +0.80V | Au³⁺/Au: +1.40V | F₂/F⁻: +2.87V</p>
                </div>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4 border-b-2 border-blue-200 pb-2">3. Nernst Equation & Applications</h2>
              <div className="bg-green-50 p-4 rounded-lg mb-4">
                <div className="text-xl font-bold mb-3 text-green-800">E = E° - (RT/nF) ln Q</div>
                <div className="text-lg font-bold mb-3 text-green-800">At 298K: E = E° - (0.059/n) log Q</div>
                <div className="bg-green-100 p-3 rounded mt-3">
                  <p className="text-sm font-semibold text-green-800 mb-1">Example 1: Concentration Cell</p>
                  <p className="text-sm text-gray-700">Zn|Zn²⁺(0.01M)||Zn²⁺(0.1M)|Zn</p>
                  <p className="text-sm text-gray-900 font-semibold">E = 0 - (0.059/2) log(0.01/0.1) = +0.0295V</p>
                </div>
                <div className="bg-green-100 p-3 rounded mt-2">
                  <p className="text-sm font-semibold text-green-800 mb-1">Example 2: pH Measurement</p>
                  <p className="text-sm text-gray-700">H⁺ + e⁻ → ½H₂, E = 0 - 0.059 pH</p>
                  <p className="text-sm text-gray-900 font-semibold">If E = -0.295V, then pH = 5</p>
                </div>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4 border-b-2 border-blue-200 pb-2">4. Gibbs Energy & EMF Relation</h2>
              <div className="bg-purple-50 p-4 rounded-lg">
                <div className="text-xl font-bold mb-3 text-purple-800">ΔG = -nFE</div>
                <div className="space-y-3">
                  <div className="bg-purple-100 p-3 rounded">
                    <p className="text-sm font-semibold text-purple-800">At Standard Conditions:</p>
                    <p className="text-sm text-gray-700">ΔG° = -nFE° | If E° &gt; 0, then ΔG° &lt; 0 (Spontaneous)</p>
                  </div>
                  <div className="bg-purple-100 p-3 rounded">
                    <p className="text-sm font-semibold text-purple-800">Equilibrium Constant:</p>
                    <p className="text-sm text-gray-700">ΔG° = -RT ln K | Therefore: ln K = nFE°/RT</p>
                    <p className="text-sm text-gray-900 font-semibold">At 298K: log K = nE°/0.059</p>
                  </div>
                </div>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4 border-b-2 border-blue-200 pb-2">5. Conductance in Electrolytic Solutions</h2>
              <div className="bg-teal-50 p-4 rounded-lg mb-4">
                <h3 className="text-lg font-bold text-teal-800 mb-2">Types of Conductance</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="bg-teal-100 p-3 rounded">
                    <p className="text-sm font-semibold text-teal-800">Specific Conductivity (κ):</p>
                    <p className="text-sm text-gray-700">κ = G × (l/A) = G × Cell constant</p>
                    <p className="text-sm text-gray-700">Unit: S/m or S/cm</p>
                  </div>
                  <div className="bg-teal-100 p-3 rounded">
                    <p className="text-sm font-semibold text-teal-800">Molar Conductivity (Λₘ):</p>
                    <p className="text-sm text-gray-700">Λₘ = κ × 1000/M</p>
                    <p className="text-sm text-gray-700">Unit: S cm²/mol</p>
                  </div>
                </div>
              </div>
              <div className="bg-cyan-50 p-4 rounded-lg">
                <h3 className="text-lg font-bold text-cyan-800 mb-2">Variation with Concentration</h3>
                <div className="space-y-2 text-sm">
                  <p><strong>Strong Electrolytes:</strong> Λₘ decreases slightly with √C</p>
                  <p><strong>Weak Electrolytes:</strong> Λₘ increases rapidly with dilution</p>
                  <div className="bg-cyan-100 p-3 rounded mt-2">
                    <p className="font-semibold text-cyan-800">Example Calculation:</p>
                    <p className="text-gray-700">0.1M KCl, G = 0.0112 S, Cell constant = 1.29 cm⁻¹</p>
                    <p className="text-gray-900 font-semibold">κ = 0.0112 × 1.29 = 0.0144 S/cm<br/>Λₘ = 0.0144 × 1000/0.1 = 144 S cm²/mol</p>
                  </div>
                </div>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4 border-b-2 border-blue-200 pb-2">6. Kohlrausch's Law</h2>
              <div className="bg-red-50 p-4 rounded-lg">
                <div className="text-xl font-bold mb-3 text-red-800">Λ°ₘ = λ°₊ + λ°₋</div>
                <p className="text-sm mb-3">At infinite dilution, molar conductivity is sum of individual ionic conductivities</p>
                <div className="bg-red-100 p-3 rounded">
                  <p className="text-sm font-semibold text-red-800 mb-1">Applications:</p>
                  <p className="text-sm text-gray-700">• Calculate Λ°ₘ for weak electrolytes</p>
                  <p className="text-sm text-gray-700">• Determine degree of dissociation: α = Λₘ/Λ°ₘ</p>
                  <p className="text-sm text-gray-700">• Find dissociation constant: Kₐ = Cα²/(1-α)</p>
                </div>
                <div className="bg-red-100 p-3 rounded mt-2">
                  <p className="text-sm font-semibold text-red-800">Example: CH₃COOH</p>
                  <p className="text-sm text-gray-700">Λ°ₘ(CH₃COOH) = λ°(CH₃COO⁻) + λ°(H⁺)</p>
                  <p className="text-sm text-gray-700">= λ°(CH₃COONa) + λ°(HCl) - λ°(NaCl)</p>
                </div>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4 border-b-2 border-blue-200 pb-2">7. Electrolysis & Faraday's Laws</h2>
              <div className="bg-amber-50 p-4 rounded-lg mb-4">
                <h3 className="text-lg font-bold text-amber-800 mb-2">Faraday's Laws of Electrolysis</h3>
                <div className="space-y-3">
                  <div className="bg-amber-100 p-3 rounded">
                    <p className="text-sm font-semibold text-amber-800">First Law:</p>
                    <p className="text-sm text-gray-700">Mass deposited ∝ Quantity of electricity</p>
                    <p className="text-sm text-gray-900 font-semibold">m = Z × I × t (Z = electrochemical equivalent)</p>
                  </div>
                  <div className="bg-amber-100 p-3 rounded">
                    <p className="text-sm font-semibold text-amber-800">Second Law:</p>
                    <p className="text-sm text-gray-700">For same quantity of electricity, m ∝ M/n</p>
                    <p className="text-sm text-gray-900 font-semibold">m = (I × t × M)/(n × F)</p>
                  </div>
                </div>
              </div>
              <div className="bg-lime-50 p-4 rounded-lg">
                <h3 className="text-lg font-bold text-lime-800 mb-2">Electrolysis Examples</h3>
                <div className="grid md:grid-cols-2 gap-4 text-sm">
                  <div className="bg-lime-100 p-3 rounded">
                    <p className="font-semibold text-lime-800">Electrolysis of NaCl:</p>
                    <p>Cathode: 2H₂O + 2e⁻ → H₂ + 2OH⁻</p>
                    <p>Anode: 2Cl⁻ → Cl₂ + 2e⁻</p>
                  </div>
                  <div className="bg-lime-100 p-3 rounded">
                    <p className="font-semibold text-lime-800">Calculation Example:</p>
                    <p>Deposit Cu using 2A for 1 hour</p>
                    <p className="font-semibold">m = (2×3600×63.5)/(2×96500) = 2.37g</p>
                  </div>
                </div>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4 border-b-2 border-blue-200 pb-2">8. Batteries & Fuel Cells</h2>
              <div className="bg-violet-50 p-4 rounded-lg mb-4">
                <h3 className="text-lg font-bold text-violet-800 mb-2">Primary Cells (Non-rechargeable)</h3>
                <div className="bg-violet-100 p-3 rounded">
                  <p className="text-sm font-semibold text-violet-800">Dry Cell (Leclanché):</p>
                  <p className="text-sm text-gray-700">Anode: Zn → Zn²⁺ + 2e⁻</p>
                  <p className="text-sm text-gray-700">Cathode: 2MnO₂ + 2NH₄⁺ + 2e⁻ → Mn₂O₃ + 2NH₃ + H₂O</p>
                  <p className="text-sm text-gray-900 font-semibold">EMF: 1.5V</p>
                </div>
              </div>
              <div className="bg-pink-50 p-4 rounded-lg mb-4">
                <h3 className="text-lg font-bold text-pink-800 mb-2">Secondary Cells (Rechargeable)</h3>
                <div className="bg-pink-100 p-3 rounded">
                  <p className="text-sm font-semibold text-pink-800">Lead Storage Battery:</p>
                  <p className="text-sm text-gray-700">Discharge:</p>
                  <p className="text-sm text-gray-700">Anode: Pb + SO₄²⁻ → PbSO₄ + 2e⁻</p>
                  <p className="text-sm text-gray-700">Cathode: PbO₂ + 4H⁺ + SO₄²⁻ + 2e⁻ → PbSO₄ + 2H₂O</p>
                  <p className="text-sm text-gray-900 font-semibold">EMF: 2.0V per cell</p>
                </div>
              </div>
              <div className="bg-emerald-50 p-4 rounded-lg">
                <h3 className="text-lg font-bold text-emerald-800 mb-2">Fuel Cells</h3>
                <div className="bg-emerald-100 p-3 rounded">
                  <p className="text-sm font-semibold text-emerald-800">H₂-O₂ Fuel Cell:</p>
                  <p className="text-sm text-gray-700">Anode: 2H₂ + 4OH⁻ → 4H₂O + 4e⁻</p>
                  <p className="text-sm text-gray-700">Cathode: O₂ + 2H₂O + 4e⁻ → 4OH⁻</p>
                  <p className="text-sm text-gray-900 font-semibold">Overall: 2H₂ + O₂ → 2H₂O | EMF: 1.23V</p>
                  <p className="text-sm text-gray-700 mt-1">Advantages: Clean, efficient, continuous operation</p>
                </div>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4 border-b-2 border-blue-200 pb-2">9. Corrosion</h2>
              <div className="bg-rose-50 p-4 rounded-lg">
                <h3 className="text-lg font-bold text-rose-800 mb-2">Electrochemical Corrosion</h3>
                <p className="text-sm mb-3">Oxidation of metals due to electrochemical reactions</p>
                <div className="space-y-3">
                  <div className="bg-rose-100 p-3 rounded">
                    <p className="text-sm font-semibold text-rose-800">Rusting of Iron:</p>
                    <p className="text-sm text-gray-700">Anode: 2Fe → 2Fe²⁺ + 4e⁻</p>
                    <p className="text-sm text-gray-700">Cathode: O₂ + 4H⁺ + 4e⁻ → 2H₂O</p>
                    <p className="text-sm text-gray-700">Overall: 4Fe + 3O₂ + 6H₂O → 4Fe(OH)₃</p>
                  </div>
                  <div className="bg-rose-100 p-3 rounded">
                    <p className="text-sm font-semibold text-rose-800">Prevention Methods:</p>
                    <p className="text-sm text-gray-700">• Galvanization (Zn coating) • Painting • Alloying</p>
                    <p className="text-sm text-gray-700">• Cathodic protection • Sacrificial anode</p>
                  </div>
                </div>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4 border-b-2 border-blue-200 pb-2">10. Previous Years' Board Questions</h2>
              <div className="space-y-4">
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h3 className="font-bold mb-3 text-blue-800">1 Mark Questions (MCQs):</h3>
                  <div className="space-y-2 text-sm">
                    <div className="bg-blue-100 p-2 rounded">
                      <p><strong>Q1.</strong> Standard hydrogen electrode potential is: (a) +1V (b) 0V (c) -1V (d) +0.5V</p>
                      <p className="text-green-600 font-semibold">Answer: (b) 0V</p>
                    </div>
                    <div className="bg-blue-100 p-2 rounded">
                      <p><strong>Q2.</strong> Unit of molar conductance: (a) S/m (b) S cm²/mol (c) S/cm (d) ohm</p>
                      <p className="text-green-600 font-semibold">Answer: (b) S cm²/mol</p>
                    </div>
                    <div className="bg-blue-100 p-2 rounded">
                      <p><strong>Q3.</strong> In galvanic cell, electrons flow from: (a) Cathode to anode (b) Anode to cathode</p>
                      <p className="text-green-600 font-semibold">Answer: (b) Anode to cathode</p>
                    </div>
                    <div className="bg-blue-100 p-2 rounded">
                      <p><strong>Q4.</strong> Faraday constant equals: (a) 96500 C (b) 96500 C/mol (c) 96.5 C (d) 965 C/mol</p>
                      <p className="text-green-600 font-semibold">Answer: (b) 96500 C/mol</p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-green-50 p-4 rounded-lg">
                  <h3 className="font-bold mb-3 text-green-800">2-3 Mark Questions:</h3>
                  <div className="space-y-3 text-sm">
                    <div className="bg-green-100 p-3 rounded">
                      <p className="font-semibold">Q1. Calculate EMF of cell: Zn|Zn²⁺(0.01M)||Cu²⁺(0.1M)|Cu at 298K</p>
                      <p className="text-gray-700 mt-1"><strong>Solution:</strong> E° = 1.10V, n = 2<br/>E = 1.10 - (0.059/2)log(0.01/0.1) = 1.10 + 0.0295 = 1.13V</p>
                    </div>
                    <div className="bg-green-100 p-3 rounded">
                      <p className="font-semibold">Q2. Define molar conductivity. How does it vary with concentration for strong and weak electrolytes?</p>
                      <p className="text-gray-700 mt-1"><strong>Answer:</strong> Λₘ = κ × 1000/M. For strong electrolytes: decreases slightly with √C. For weak electrolytes: increases rapidly with dilution due to increased ionization.</p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-purple-50 p-4 rounded-lg">
                  <h3 className="font-bold mb-3 text-purple-800">5 Mark Questions:</h3>
                  <div className="space-y-3 text-sm">
                    <div className="bg-purple-100 p-3 rounded">
                      <p className="font-semibold">Q1. Explain the construction and working of lead storage battery. Write electrode reactions.</p>
                      <p className="text-gray-700 mt-1"><strong>Answer:</strong> Construction: Pb anode, PbO₂ cathode, H₂SO₄ electrolyte<br/>Discharge: Anode: Pb + SO₄²⁻ → PbSO₄ + 2e⁻<br/>Cathode: PbO₂ + 4H⁺ + SO₄²⁻ + 2e⁻ → PbSO₄ + 2H₂O<br/>EMF: 2V per cell, rechargeable</p>
                    </div>
                    <div className="bg-purple-100 p-3 rounded">
                      <p className="font-semibold">Q2. State and explain Kohlrausch's law. How is it used to determine Λ° of weak electrolytes?</p>
                      <p className="text-gray-700 mt-1"><strong>Answer:</strong> Λ°ₘ = λ°₊ + λ°₋. At infinite dilution, each ion contributes independently. For CH₃COOH: Λ°(CH₃COOH) = Λ°(CH₃COONa) + Λ°(HCl) - Λ°(NaCl)</p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4 border-b-2 border-blue-200 pb-2">11. Memory Techniques & Mnemonics</h2>
              <div className="bg-yellow-50 p-4 rounded-lg">
                <h3 className="text-lg font-bold text-yellow-800 mb-3">🧠 Smart Memory Tricks</h3>
                <div className="space-y-3 text-sm">
                  <div className="bg-yellow-100 p-3 rounded">
                    <p className="font-semibold text-yellow-800">PANIC for Galvanic Cell:</p>
                    <p className="text-gray-700"><strong>P</strong>ositive terminal = Cathode, <strong>A</strong>node = Negative, <strong>N</strong>egative ions move to anode, <strong>I</strong>ons flow internally, <strong>C</strong>urrent flows externally</p>
                  </div>
                  <div className="bg-yellow-100 p-3 rounded">
                    <p className="font-semibold text-yellow-800">RED CAT, AN OX:</p>
                    <p className="text-gray-700"><strong>RED</strong>uction at <strong>CAT</strong>hode, <strong>AN</strong>ode = <strong>OX</strong>idation</p>
                  </div>
                  <div className="bg-yellow-100 p-3 rounded">
                    <p className="font-semibold text-yellow-800">LEO says GER:</p>
                    <p className="text-gray-700"><strong>L</strong>ose <strong>E</strong>lectrons <strong>O</strong>xidation, <strong>G</strong>ain <strong>E</strong>lectrons <strong>R</strong>eduction</p>
                  </div>
                  <div className="bg-yellow-100 p-3 rounded">
                    <p className="font-semibold text-yellow-800">Nernst Equation Memory:</p>
                    <p className="text-gray-700">"<strong>E</strong>very <strong>E</strong>lectron <strong>N</strong>eeds <strong>L</strong>og" → E = E° - (RT/nF)lnQ</p>
                  </div>
                  <div className="bg-yellow-100 p-3 rounded">
                    <p className="font-semibold text-yellow-800">Standard Electrode Potentials:</p>
                    <p className="text-gray-700">"<strong>L</strong>i <strong>K</strong>eeps <strong>C</strong>alm, <strong>Z</strong>n <strong>H</strong>elps <strong>C</strong>u <strong>A</strong>nd <strong>A</strong>u" (Most -ve to +ve)</p>
                  </div>
                  <div className="bg-yellow-100 p-3 rounded">
                    <p className="font-semibold text-yellow-800">Faraday's Laws:</p>
                    <p className="text-gray-700">"<strong>M</strong>ass <strong>I</strong>s <strong>T</strong>ime <strong>M</strong>olar <strong>N</strong>umber <strong>F</strong>araday" → m = ItM/nF</p>
                  </div>
                </div>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4 border-b-2 border-blue-200 pb-2">12. Quick Revision Points</h2>
              <div className="bg-indigo-50 p-4 rounded-lg">
                <h3 className="text-lg font-bold text-indigo-800 mb-3">⚡ Last-Minute Revision</h3>
                <div className="grid md:grid-cols-2 gap-4 text-sm">
                  <div className="space-y-2">
                    <div className="bg-indigo-100 p-2 rounded">
                      <p className="font-semibold text-indigo-800">Key Formulas:</p>
                      <p>• E°cell = E°cathode - E°anode</p>
                      <p>• E = E° - (0.059/n) log Q</p>
                      <p>• ΔG° = -nFE°</p>
                      <p>• Λₘ = κ × 1000/M</p>
                    </div>
                    <div className="bg-indigo-100 p-2 rounded">
                      <p className="font-semibold text-indigo-800">Important Values:</p>
                      <p>• F = 96500 C/mol</p>
                      <p>• 0.059 at 298K</p>
                      <p>• SHE = 0.00V</p>
                      <p>• Zn²⁺/Zn = -0.76V</p>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="bg-indigo-100 p-2 rounded">
                      <p className="font-semibold text-indigo-800">Key Concepts:</p>
                      <p>• Galvanic: Spontaneous, E° &gt; 0</p>
                      <p>• Electrolytic: Non-spontaneous</p>
                      <p>• Anode: Oxidation occurs</p>
                      <p>• Cathode: Reduction occurs</p>
                    </div>
                    <div className="bg-indigo-100 p-2 rounded">
                      <p className="font-semibold text-indigo-800">Common Mistakes:</p>
                      <p>• Sign confusion in Nernst equation</p>
                      <p>• Anode-cathode polarity mix-up</p>
                      <p>• Units in conductivity problems</p>
                      <p>• Faraday's law calculations</p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4 border-b-2 border-blue-200 pb-2">13. Exam Strategy & Tips</h2>
              <div className="bg-orange-50 p-4 rounded-lg">
                <h3 className="text-lg font-bold text-orange-800 mb-3">🎯 Scoring Strategy</h3>
                <div className="space-y-3 text-sm">
                  <div className="bg-orange-100 p-3 rounded">
                    <p className="font-semibold text-orange-800">Time Management (Unit weightage: 9 marks):</p>
                    <p className="text-gray-700">• MCQs (1 mark): 30 seconds each</p>
                    <p className="text-gray-700">• Short answers (2-3 marks): 3-4 minutes</p>
                    <p className="text-gray-700">• Long answers (5 marks): 8-10 minutes</p>
                    <p className="text-gray-700">• Always attempt Nernst equation problems - easy marks!</p>
                  </div>
                  <div className="bg-orange-100 p-3 rounded">
                    <p className="font-semibold text-orange-800">High-Scoring Topics:</p>
                    <p className="text-gray-700">• Nernst equation calculations (guaranteed 3-5 marks)</p>
                    <p className="text-gray-700">• Conductivity problems (2-3 marks)</p>
                    <p className="text-gray-700">• Battery working (3-5 marks)</p>
                    <p className="text-gray-700">• Faraday's law numericals (2-3 marks)</p>
                  </div>
                  <div className="bg-orange-100 p-3 rounded">
                    <p className="font-semibold text-orange-800">Answer Writing Tips:</p>
                    <p className="text-gray-700">• Always write given data clearly</p>
                    <p className="text-gray-700">• Show formula before substitution</p>
                    <p className="text-gray-700">• Include units in final answer</p>
                    <p className="text-gray-700">• Draw neat diagrams for cell questions</p>
                  </div>
                  <div className="bg-orange-100 p-3 rounded">
                    <p className="font-semibold text-orange-800">Common Question Patterns:</p>
                    <p className="text-gray-700">• EMF calculation using Nernst equation</p>
                    <p className="text-gray-700">• Conductivity and molar conductivity</p>
                    <p className="text-gray-700">• Electrolysis mass calculations</p>
                    <p className="text-gray-700">• Battery construction and working</p>
                  </div>
                </div>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4 border-b-2 border-blue-200 pb-2">14. Important Formulas & Constants</h2>
              <div className="bg-slate-50 p-4 rounded-lg">
                <div className="grid md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <h3 className="font-semibold mb-2 text-slate-800">EMF & Thermodynamics:</h3>
                    <ul className="space-y-1">
                      <li>• E°cell = E°cathode - E°anode</li>
                      <li>• E = E° - (0.059/n) log Q</li>
                      <li>• ΔG° = -nFE°</li>
                      <li>• log K = nE°/0.059</li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2 text-slate-800">Conductance & Electrolysis:</h3>
                    <ul className="space-y-1">
                      <li>• Λₘ = κ × 1000/M</li>
                      <li>• m = ItM/nF</li>
                      <li>• κ = G × (l/A)</li>
                      <li>• Λ°ₘ = λ°₊ + λ°₋</li>
                    </ul>
                  </div>
                </div>
                <div className="mt-4 bg-slate-100 p-3 rounded">
                  <h3 className="font-semibold mb-2 text-slate-800">Constants:</h3>
                  <p className="text-sm text-gray-700">F = 96500 C/mol | R = 8.314 J/mol·K | T = 298K | 0.059 = 2.303RT/F at 298K</p>
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