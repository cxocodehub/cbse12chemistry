'use client'

import { useRef, useEffect, useState } from 'react'

export default function Unit3() {
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
      
      pdf.save('CBSE-Class12-Chemistry-Unit3-Chemical-Kinetics.pdf')
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
              <a href="/unit3" className="w-8 h-8 bg-yellow-500 text-white rounded-full flex items-center justify-center text-sm" title="Chemical Kinetics">3</a>
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
              <h2 className="text-xl font-semibold text-gray-700 mt-2">Unit 3: Chemical Kinetics - Complete Notes</h2>
            </div>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4 border-b-2 border-blue-200 pb-2">1. Rate of Reaction</h2>
              <div className="bg-blue-50 p-4 rounded-lg mb-4">
                <h3 className="text-lg font-bold text-blue-800 mb-2">Definition & Types</h3>
                <p className="text-sm mb-2">Rate of reaction is the change in concentration of reactants or products per unit time</p>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="bg-blue-100 p-3 rounded">
                    <p className="text-sm font-semibold text-blue-800">Average Rate:</p>
                    <p className="text-sm text-gray-700">Rate = Δ[Product]/Δt = -Δ[Reactant]/Δt</p>
                    <p className="text-sm text-gray-900">Over a time interval</p>
                  </div>
                  <div className="bg-blue-100 p-3 rounded">
                    <p className="text-sm font-semibold text-blue-800">Instantaneous Rate:</p>
                    <p className="text-sm text-gray-700">Rate = d[Product]/dt = -d[Reactant]/dt</p>
                    <p className="text-sm text-gray-900">At a specific instant</p>
                  </div>
                </div>
              </div>
              <div className="bg-green-50 p-4 rounded-lg">
                <h3 className="text-lg font-bold text-green-800 mb-2">Rate Expression</h3>
                <p className="text-sm mb-2">For reaction: aA + bB → cC + dD</p>
                <div className="bg-green-100 p-3 rounded">
                  <p className="text-sm font-semibold text-green-800">Rate = -(1/a)d[A]/dt = -(1/b)d[B]/dt = (1/c)d[C]/dt = (1/d)d[D]/dt</p>
                </div>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4 border-b-2 border-blue-200 pb-2">2. Factors Affecting Rate of Reaction</h2>
              <div className="space-y-4">
                <div className="bg-yellow-50 p-4 rounded-lg">
                  <h3 className="text-lg font-bold text-yellow-800 mb-2">1. Concentration</h3>
                  <p className="text-sm mb-2">Higher concentration → More collisions → Higher rate</p>
                  <div className="bg-yellow-100 p-3 rounded">
                    <p className="text-sm text-gray-700">Example: 2HI → H₂ + I₂</p>
                    <p className="text-sm text-gray-900 font-semibold">Rate ∝ [HI]²</p>
                  </div>
                </div>
                <div className="bg-orange-50 p-4 rounded-lg">
                  <h3 className="text-lg font-bold text-orange-800 mb-2">2. Temperature</h3>
                  <p className="text-sm mb-2">Higher temperature → More kinetic energy → Higher rate</p>
                  <div className="bg-orange-100 p-3 rounded">
                    <p className="text-sm text-gray-700">Rule of thumb: Rate doubles for every 10°C rise</p>
                    <p className="text-sm text-gray-900 font-semibold">Arrhenius equation: k = Ae^(-Ea/RT)</p>
                  </div>
                </div>
                <div className="bg-purple-50 p-4 rounded-lg">
                  <h3 className="text-lg font-bold text-purple-800 mb-2">3. Catalyst</h3>
                  <p className="text-sm mb-2">Provides alternative pathway with lower activation energy</p>
                  <div className="bg-purple-100 p-3 rounded">
                    <p className="text-sm text-gray-700">• Positive catalyst: Increases rate</p>
                    <p className="text-sm text-gray-700">• Negative catalyst: Decreases rate</p>
                    <p className="text-sm text-gray-900 font-semibold">Catalyst remains unchanged</p>
                  </div>
                </div>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4 border-b-2 border-blue-200 pb-2">3. Order and Molecularity</h2>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-red-50 p-4 rounded-lg">
                  <h3 className="text-lg font-bold text-red-800 mb-2">Order of Reaction</h3>
                  <p className="text-sm mb-2">Sum of powers of concentration terms in rate law</p>
                  <div className="bg-red-100 p-3 rounded">
                    <p className="text-sm text-gray-700">Rate = k[A]^m[B]^n</p>
                    <p className="text-sm text-gray-900 font-semibold">Order = m + n</p>
                    <p className="text-sm text-gray-700 mt-1">• Can be fractional</p>
                    <p className="text-sm text-gray-700">• Determined experimentally</p>
                  </div>
                </div>
                <div className="bg-teal-50 p-4 rounded-lg">
                  <h3 className="text-lg font-bold text-teal-800 mb-2">Molecularity</h3>
                  <p className="text-sm mb-2">Number of molecules participating in elementary reaction</p>
                  <div className="bg-teal-100 p-3 rounded">
                    <p className="text-sm text-gray-700">• Always whole number</p>
                    <p className="text-sm text-gray-700">• Cannot be zero</p>
                    <p className="text-sm text-gray-700">• Maximum value is 3</p>
                    <p className="text-sm text-gray-900 font-semibold">Theoretical concept</p>
                  </div>
                </div>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4 border-b-2 border-blue-200 pb-2">4. Rate Law and Rate Constant</h2>
              <div className="bg-indigo-50 p-4 rounded-lg mb-4">
                <h3 className="text-lg font-bold text-indigo-800 mb-2">Rate Law</h3>
                <p className="text-sm mb-2">Mathematical expression relating rate to concentration</p>
                <div className="bg-indigo-100 p-3 rounded">
                  <p className="text-sm font-semibold text-indigo-800">General Form: Rate = k[A]^m[B]^n</p>
                  <p className="text-sm text-gray-700">k = rate constant, m,n = orders</p>
                </div>
              </div>
              <div className="bg-cyan-50 p-4 rounded-lg">
                <h3 className="text-lg font-bold text-cyan-800 mb-2">Rate Constant (k)</h3>
                <div className="space-y-2 text-sm">
                  <p>• Specific for each reaction at given temperature</p>
                  <p>• Independent of concentration</p>
                  <p>• Units depend on order of reaction</p>
                  <div className="bg-cyan-100 p-3 rounded mt-2">
                    <p className="font-semibold text-cyan-800">Units of k:</p>
                    <p>Zero order: mol L⁻¹ s⁻¹</p>
                    <p>First order: s⁻¹</p>
                    <p>Second order: L mol⁻¹ s⁻¹</p>
                  </div>
                </div>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4 border-b-2 border-blue-200 pb-2">5. Integrated Rate Equations</h2>
              <div className="space-y-4">
                <div className="bg-green-50 p-4 rounded-lg">
                  <h3 className="text-lg font-bold text-green-800 mb-2">Zero Order Reaction</h3>
                  <div className="bg-green-100 p-3 rounded">
                    <p className="text-sm font-semibold text-green-800">Rate = k (independent of concentration)</p>
                    <p className="text-sm text-gray-700">Integrated form: [A] = [A]₀ - kt</p>
                    <p className="text-sm text-gray-700">Half-life: t₁/₂ = [A]₀/2k</p>
                    <p className="text-sm text-gray-900">Example: Photochemical reactions</p>
                  </div>
                </div>
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h3 className="text-lg font-bold text-blue-800 mb-2">First Order Reaction</h3>
                  <div className="bg-blue-100 p-3 rounded">
                    <p className="text-sm font-semibold text-blue-800">Rate = k[A]</p>
                    <p className="text-sm text-gray-700">Integrated form: ln[A] = ln[A]₀ - kt</p>
                    <p className="text-sm text-gray-700">Half-life: t₁/₂ = 0.693/k (constant)</p>
                    <p className="text-sm text-gray-900">Example: Radioactive decay, N₂O₅ decomposition</p>
                  </div>
                </div>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4 border-b-2 border-blue-200 pb-2">6. Half-Life</h2>
              <div className="bg-purple-50 p-4 rounded-lg">
                <h3 className="text-lg font-bold text-purple-800 mb-2">Definition & Applications</h3>
                <p className="text-sm mb-3">Time required for concentration to reduce to half of initial value</p>
                <div className="grid md:grid-cols-2 gap-4 text-sm">
                  <div className="bg-purple-100 p-3 rounded">
                    <p className="font-semibold text-purple-800">Zero Order:</p>
                    <p>t₁/₂ = [A]₀/2k</p>
                    <p className="text-gray-700">Depends on initial concentration</p>
                  </div>
                  <div className="bg-purple-100 p-3 rounded">
                    <p className="font-semibold text-purple-800">First Order:</p>
                    <p>t₁/₂ = 0.693/k</p>
                    <p className="text-gray-700">Independent of concentration</p>
                  </div>
                </div>
                <div className="bg-purple-100 p-3 rounded mt-3">
                  <p className="text-sm font-semibold text-purple-800">Example Calculation:</p>
                  <p className="text-sm text-gray-700">If k = 0.0693 s⁻¹ for first order reaction</p>
                  <p className="text-sm text-gray-900 font-semibold">t₁/₂ = 0.693/0.0693 = 10 seconds</p>
                </div>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4 border-b-2 border-blue-200 pb-2">7. Collision Theory</h2>
              <div className="bg-orange-50 p-4 rounded-lg">
                <h3 className="text-lg font-bold text-orange-800 mb-2">Basic Concepts</h3>
                <p className="text-sm mb-3">Reactions occur when molecules collide with sufficient energy and proper orientation</p>
                <div className="space-y-3">
                  <div className="bg-orange-100 p-3 rounded">
                    <p className="text-sm font-semibold text-orange-800">Conditions for Effective Collision:</p>
                    <p className="text-sm text-gray-700">1. Energy ≥ Activation energy (Ea)</p>
                    <p className="text-sm text-gray-700">2. Proper orientation of molecules</p>
                    <p className="text-sm text-gray-700">3. Formation of activated complex</p>
                  </div>
                  <div className="bg-orange-100 p-3 rounded">
                    <p className="text-sm font-semibold text-orange-800">Rate of Reaction ∝</p>
                    <p className="text-sm text-gray-700">• Number of collisions per second</p>
                    <p className="text-sm text-gray-700">• Fraction of effective collisions</p>
                    <p className="text-sm text-gray-700">• e^(-Ea/RT) factor</p>
                  </div>
                </div>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4 border-b-2 border-blue-200 pb-2">8. Activation Energy & Arrhenius Equation</h2>
              <div className="bg-red-50 p-4 rounded-lg mb-4">
                <h3 className="text-lg font-bold text-red-800 mb-2">Activation Energy (Ea)</h3>
                <p className="text-sm mb-2">Minimum energy required for reaction to occur</p>
                <div className="bg-red-100 p-3 rounded">
                  <p className="text-sm text-gray-700">• Higher Ea → Slower reaction</p>
                  <p className="text-sm text-gray-700">• Catalyst lowers Ea</p>
                  <p className="text-sm text-gray-700">• Temperature independent</p>
                  <p className="text-sm text-gray-900 font-semibold">Units: kJ/mol</p>
                </div>
              </div>
              <div className="bg-yellow-50 p-4 rounded-lg">
                <h3 className="text-lg font-bold text-yellow-800 mb-2">Arrhenius Equation</h3>
                <div className="space-y-3">
                  <div className="bg-yellow-100 p-3 rounded">
                    <p className="text-sm font-semibold text-yellow-800">k = Ae^(-Ea/RT)</p>
                    <p className="text-sm text-gray-700">A = pre-exponential factor</p>
                    <p className="text-sm text-gray-700">Ea = activation energy</p>
                    <p className="text-sm text-gray-700">R = gas constant, T = temperature</p>
                  </div>
                  <div className="bg-yellow-100 p-3 rounded">
                    <p className="text-sm font-semibold text-yellow-800">Linear Form:</p>
                    <p className="text-sm text-gray-700">ln k = ln A - Ea/RT</p>
                    <p className="text-sm text-gray-700">Plot ln k vs 1/T gives straight line</p>
                    <p className="text-sm text-gray-900 font-semibold">Slope = -Ea/R</p>
                  </div>
                </div>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4 border-b-2 border-blue-200 pb-2">9. Previous Years' Board Questions</h2>
              <div className="space-y-4">
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h3 className="font-bold mb-3 text-blue-800">1 Mark Questions (MCQs):</h3>
                  <div className="space-y-2 text-sm">
                    <div className="bg-blue-100 p-2 rounded">
                      <p><strong>Q1.</strong> Unit of rate constant for first order reaction: (a) mol L⁻¹ s⁻¹ (b) s⁻¹ (c) L mol⁻¹ s⁻¹</p>
                      <p className="text-green-600 font-semibold">Answer: (b) s⁻¹</p>
                    </div>
                    <div className="bg-blue-100 p-2 rounded">
                      <p><strong>Q2.</strong> Half-life of first order reaction is: (a) Proportional to initial concentration (b) Independent of initial concentration</p>
                      <p className="text-green-600 font-semibold">Answer: (b) Independent of initial concentration</p>
                    </div>
                    <div className="bg-blue-100 p-2 rounded">
                      <p><strong>Q3.</strong> Molecularity of reaction can be: (a) Zero (b) Fractional (c) Only whole number</p>
                      <p className="text-green-600 font-semibold">Answer: (c) Only whole number</p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-green-50 p-4 rounded-lg">
                  <h3 className="font-bold mb-3 text-green-800">2-3 Mark Questions:</h3>
                  <div className="space-y-3 text-sm">
                    <div className="bg-green-100 p-3 rounded">
                      <p className="font-semibold">Q1. For first order reaction, prove that t₁/₂ = 0.693/k</p>
                      <p className="text-gray-700 mt-1"><strong>Solution:</strong> At t₁/₂, [A] = [A]₀/2<br/>ln([A]₀/2) = ln[A]₀ - kt₁/₂<br/>ln(1/2) = -kt₁/₂<br/>t₁/₂ = 0.693/k</p>
                    </div>
                    <div className="bg-green-100 p-3 rounded">
                      <p className="font-semibold">Q2. Distinguish between order and molecularity of reaction.</p>
                      <p className="text-gray-700 mt-1"><strong>Answer:</strong> Order: Sum of powers in rate law, can be fractional, experimental. Molecularity: Number of molecules in elementary step, always whole number, theoretical.</p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-purple-50 p-4 rounded-lg">
                  <h3 className="font-bold mb-3 text-purple-800">5 Mark Questions:</h3>
                  <div className="space-y-3 text-sm">
                    <div className="bg-purple-100 p-3 rounded">
                      <p className="font-semibold">Q1. Derive integrated rate equation for first order reaction and explain its graphical representation.</p>
                      <p className="text-gray-700 mt-1"><strong>Answer:</strong> Rate = k[A], -d[A]/dt = k[A], Integration gives ln[A] = ln[A]₀ - kt. Plot ln[A] vs t gives straight line with slope = -k.</p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4 border-b-2 border-blue-200 pb-2">10. Memory Techniques & Mnemonics</h2>
              <div className="bg-yellow-50 p-4 rounded-lg">
                <h3 className="text-lg font-bold text-yellow-800 mb-3">🧠 Smart Memory Tricks</h3>
                <div className="space-y-3 text-sm">
                  <div className="bg-yellow-100 p-3 rounded">
                    <p className="font-semibold text-yellow-800">RATE for factors affecting rate:</p>
                    <p className="text-gray-700"><strong>R</strong>eactant concentration, <strong>A</strong>ctivation energy, <strong>T</strong>emperature, <strong>E</strong>nzyme/catalyst</p>
                  </div>
                  <div className="bg-yellow-100 p-3 rounded">
                    <p className="font-semibold text-yellow-800">Order vs Molecularity:</p>
                    <p className="text-gray-700">"<strong>O</strong>rder is <strong>O</strong>bserved (experimental), <strong>M</strong>olecularity is <strong>M</strong>echanistic (theoretical)"</p>
                  </div>
                  <div className="bg-yellow-100 p-3 rounded">
                    <p className="font-semibold text-yellow-800">Half-life Memory:</p>
                    <p className="text-gray-700">"<strong>F</strong>irst order is <strong>F</strong>ixed (constant t₁/₂), <strong>Z</strong>ero order <strong>Z</strong>aps with concentration"</p>
                  </div>
                  <div className="bg-yellow-100 p-3 rounded">
                    <p className="font-semibold text-yellow-800">Arrhenius Equation:</p>
                    <p className="text-gray-700">"<strong>A</strong>rrhenius <strong>A</strong>lways <strong>E</strong>xplains <strong>R</strong>ate <strong>T</strong>emperature" → k = Ae^(-Ea/RT)</p>
                  </div>
                </div>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4 border-b-2 border-blue-200 pb-2">11. Quick Revision Points</h2>
              <div className="bg-indigo-50 p-4 rounded-lg">
                <h3 className="text-lg font-bold text-indigo-800 mb-3">⚡ Last-Minute Revision</h3>
                <div className="grid md:grid-cols-2 gap-4 text-sm">
                  <div className="space-y-2">
                    <div className="bg-indigo-100 p-2 rounded">
                      <p className="font-semibold text-indigo-800">Key Formulas:</p>
                      <p>• Rate = k[A]^m[B]^n</p>
                      <p>• t₁/₂ = 0.693/k (1st order)</p>
                      <p>• k = Ae^(-Ea/RT)</p>
                      <p>• ln k = ln A - Ea/RT</p>
                    </div>
                    <div className="bg-indigo-100 p-2 rounded">
                      <p className="font-semibold text-indigo-800">Units of k:</p>
                      <p>• Zero order: mol L⁻¹ s⁻¹</p>
                      <p>• First order: s⁻¹</p>
                      <p>• Second order: L mol⁻¹ s⁻¹</p>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="bg-indigo-100 p-2 rounded">
                      <p className="font-semibold text-indigo-800">Key Concepts:</p>
                      <p>• Order: Experimental, can be fractional</p>
                      <p>• Molecularity: Theoretical, whole number</p>
                      <p>• Catalyst: Lowers Ea, unchanged</p>
                      <p>• Higher T → Higher rate</p>
                    </div>
                    <div className="bg-indigo-100 p-2 rounded">
                      <p className="font-semibold text-indigo-800">Common Mistakes:</p>
                      <p>• Confusing order with molecularity</p>
                      <p>• Wrong units for rate constant</p>
                      <p>• Half-life formula confusion</p>
                      <p>• Arrhenius equation signs</p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4 border-b-2 border-blue-200 pb-2">12. Exam Strategy & Tips</h2>
              <div className="bg-orange-50 p-4 rounded-lg">
                <h3 className="text-lg font-bold text-orange-800 mb-3">🎯 Scoring Strategy</h3>
                <div className="space-y-3 text-sm">
                  <div className="bg-orange-100 p-3 rounded">
                    <p className="font-semibold text-orange-800">Time Management (Unit weightage: 7 marks):</p>
                    <p className="text-gray-700">• MCQs: 30 seconds each</p>
                    <p className="text-gray-700">• Numerical problems: 4-5 minutes</p>
                    <p className="text-gray-700">• Theory questions: 3-4 minutes</p>
                    <p className="text-gray-700">• Always attempt half-life and Arrhenius problems!</p>
                  </div>
                  <div className="bg-orange-100 p-3 rounded">
                    <p className="font-semibold text-orange-800">High-Scoring Topics:</p>
                    <p className="text-gray-700">• Half-life calculations (guaranteed 2-3 marks)</p>
                    <p className="text-gray-700">• Order determination (2-3 marks)</p>
                    <p className="text-gray-700">• Arrhenius equation (3-5 marks)</p>
                    <p className="text-gray-700">• Rate law derivation (2-3 marks)</p>
                  </div>
                  <div className="bg-orange-100 p-3 rounded">
                    <p className="font-semibold text-orange-800">Answer Writing Tips:</p>
                    <p className="text-gray-700">• Always write the rate law first</p>
                    <p className="text-gray-700">• Show integration steps clearly</p>
                    <p className="text-gray-700">• Include proper units</p>
                    <p className="text-gray-700">• Draw energy diagrams neatly</p>
                  </div>
                </div>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4 border-b-2 border-blue-200 pb-2">13. Important Formulas & Constants</h2>
              <div className="bg-slate-50 p-4 rounded-lg">
                <div className="grid md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <h3 className="font-semibold mb-2 text-slate-800">Rate Equations:</h3>
                    <ul className="space-y-1">
                      <li>• Rate = k[A]^m[B]^n</li>
                      <li>• Zero order: [A] = [A]₀ - kt</li>
                      <li>• First order: ln[A] = ln[A]₀ - kt</li>
                      <li>• t₁/₂ = 0.693/k (1st order)</li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2 text-slate-800">Temperature Dependence:</h3>
                    <ul className="space-y-1">
                      <li>• k = Ae^(-Ea/RT)</li>
                      <li>• ln k = ln A - Ea/RT</li>
                      <li>• ln(k₂/k₁) = (Ea/R)(1/T₁ - 1/T₂)</li>
                    </ul>
                  </div>
                </div>
                <div className="mt-4 bg-slate-100 p-3 rounded">
                  <h3 className="font-semibold mb-2 text-slate-800">Constants:</h3>
                  <p className="text-sm text-gray-700">R = 8.314 J/mol·K | ln 2 = 0.693 | Ea typically 50-200 kJ/mol</p>
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