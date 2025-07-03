'use client'

import { useRef, useEffect, useState } from 'react'

export default function Unit4() {
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
      
      pdf.save('CBSE-Class12-Chemistry-Unit4-d-and-f-Block-Elements.pdf')
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
              <a href="/unit4" className="w-8 h-8 bg-yellow-500 text-white rounded-full flex items-center justify-center text-sm" title="d-and f-Block Elements">4</a>
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
              <h2 className="text-xl font-semibold text-gray-700 mt-2">Unit 4: d-and f-Block Elements - Complete Notes</h2>
            </div>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4 border-b-2 border-blue-200 pb-2">1. Transition Metals - General Introduction</h2>
              <div className="bg-blue-50 p-4 rounded-lg mb-4">
                <h3 className="text-lg font-bold text-blue-800 mb-2">Definition & Position</h3>
                <p className="text-sm mb-2">Elements with partially filled d-orbitals in ground state or common oxidation states</p>
                <div className="bg-blue-100 p-3 rounded">
                  <p className="text-sm font-semibold text-blue-800">Position in Periodic Table:</p>
                  <p className="text-sm text-gray-700">• Groups 3-12 (d-block elements)</p>
                  <p className="text-sm text-gray-700">• Between s-block and p-block</p>
                  <p className="text-sm text-gray-700">• Four series: 3d, 4d, 5d, 6d</p>
                </div>
              </div>
              <div className="bg-green-50 p-4 rounded-lg">
                <h3 className="text-lg font-bold text-green-800 mb-2">Electronic Configuration</h3>
                <div className="space-y-2 text-sm">
                  <p><strong>General:</strong> (n-1)d¹⁻¹⁰ ns¹⁻²</p>
                  <div className="bg-green-100 p-3 rounded">
                    <p className="font-semibold text-green-800">First Row (3d series):</p>
                    <p>Sc: [Ar] 3d¹ 4s² | Ti: [Ar] 3d² 4s² | V: [Ar] 3d³ 4s²</p>
                    <p>Cr: [Ar] 3d⁵ 4s¹ | Mn: [Ar] 3d⁵ 4s² | Fe: [Ar] 3d⁶ 4s²</p>
                    <p>Co: [Ar] 3d⁷ 4s² | Ni: [Ar] 3d⁸ 4s² | Cu: [Ar] 3d¹⁰ 4s¹ | Zn: [Ar] 3d¹⁰ 4s²</p>
                  </div>
                </div>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4 border-b-2 border-blue-200 pb-2">2. General Properties of Transition Metals</h2>
              <div className="space-y-4">
                <div className="bg-yellow-50 p-4 rounded-lg">
                  <h3 className="text-lg font-bold text-yellow-800 mb-2">1. Metallic Character</h3>
                  <div className="bg-yellow-100 p-3 rounded">
                    <p className="text-sm text-gray-700">• High density due to close packing</p>
                    <p className="text-sm text-gray-700">• High melting and boiling points</p>
                    <p className="text-sm text-gray-700">• Good electrical and thermal conductivity</p>
                    <p className="text-sm text-gray-900 font-semibold">Exception: Hg is liquid at room temperature</p>
                  </div>
                </div>
                <div className="bg-orange-50 p-4 rounded-lg">
                  <h3 className="text-lg font-bold text-orange-800 mb-2">2. Ionization Enthalpy</h3>
                  <div className="bg-orange-100 p-3 rounded">
                    <p className="text-sm text-gray-700">• Higher than s-block, lower than p-block</p>
                    <p className="text-sm text-gray-700">• Gradual increase across period</p>
                    <p className="text-sm text-gray-700">• Small difference between successive values</p>
                    <p className="text-sm text-gray-900 font-semibold">Reason: Poor shielding by d-electrons</p>
                  </div>
                </div>
                <div className="bg-purple-50 p-4 rounded-lg">
                  <h3 className="text-lg font-bold text-purple-800 mb-2">3. Oxidation States</h3>
                  <div className="bg-purple-100 p-3 rounded">
                    <p className="text-sm text-gray-700">• Variable oxidation states</p>
                    <p className="text-sm text-gray-700">• Range from +1 to +7</p>
                    <p className="text-sm text-gray-700">• Higher oxidation states in oxides and fluorides</p>
                    <p className="text-sm text-gray-900 font-semibold">Example: Mn shows +2 to +7 oxidation states</p>
                  </div>
                </div>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4 border-b-2 border-blue-200 pb-2">3. Trends in First Row Transition Metals</h2>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-red-50 p-4 rounded-lg">
                  <h3 className="text-lg font-bold text-red-800 mb-2">Atomic & Ionic Radii</h3>
                  <div className="bg-red-100 p-3 rounded">
                    <p className="text-sm text-gray-700">• Atomic radii decrease slowly</p>
                    <p className="text-sm text-gray-700">• Ionic radii decrease with charge</p>
                    <p className="text-sm text-gray-900 font-semibold">Reason: Lanthanide contraction effect</p>
                  </div>
                </div>
                <div className="bg-teal-50 p-4 rounded-lg">
                  <h3 className="text-lg font-bold text-teal-800 mb-2">Color</h3>
                  <div className="bg-teal-100 p-3 rounded">
                    <p className="text-sm text-gray-700">• Most compounds are colored</p>
                    <p className="text-sm text-gray-700">• Due to d-d transitions</p>
                    <p className="text-sm text-gray-900 font-semibold">Colorless: d⁰ and d¹⁰ configurations</p>
                  </div>
                </div>
              </div>
              <div className="bg-indigo-50 p-4 rounded-lg mt-4">
                <h3 className="text-lg font-bold text-indigo-800 mb-2">Catalytic Properties</h3>
                <div className="space-y-2 text-sm">
                  <p>Excellent catalysts due to:</p>
                  <div className="bg-indigo-100 p-3 rounded">
                    <p>• Variable oxidation states</p>
                    <p>• Ability to form complexes</p>
                    <p>• Large surface area</p>
                    <p className="font-semibold text-indigo-800">Examples: Fe in Haber process, V₂O₅ in Contact process</p>
                  </div>
                </div>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4 border-b-2 border-blue-200 pb-2">4. Magnetic Properties</h2>
              <div className="bg-cyan-50 p-4 rounded-lg">
                <h3 className="text-lg font-bold text-cyan-800 mb-2">Types of Magnetism</h3>
                <div className="grid md:grid-cols-2 gap-4 text-sm">
                  <div className="bg-cyan-100 p-3 rounded">
                    <p className="font-semibold text-cyan-800">Paramagnetic:</p>
                    <p>• Unpaired electrons present</p>
                    <p>• Attracted by magnetic field</p>
                    <p>• μ = √n(n+2) BM</p>
                    <p className="text-gray-900">Example: Fe³⁺, Mn²⁺</p>
                  </div>
                  <div className="bg-cyan-100 p-3 rounded">
                    <p className="font-semibold text-cyan-800">Diamagnetic:</p>
                    <p>• All electrons paired</p>
                    <p>• Repelled by magnetic field</p>
                    <p>• μ = 0 BM</p>
                    <p className="text-gray-900">Example: Zn²⁺, Cu⁺</p>
                  </div>
                </div>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4 border-b-2 border-blue-200 pb-2">5. Interstitial Compounds & Alloys</h2>
              <div className="space-y-4">
                <div className="bg-lime-50 p-4 rounded-lg">
                  <h3 className="text-lg font-bold text-lime-800 mb-2">Interstitial Compounds</h3>
                  <div className="bg-lime-100 p-3 rounded">
                    <p className="text-sm text-gray-700">• Small atoms (H, C, N) occupy interstitial sites</p>
                    <p className="text-sm text-gray-700">• Retain metallic properties</p>
                    <p className="text-sm text-gray-700">• Higher melting points than parent metals</p>
                    <p className="text-sm text-gray-900 font-semibold">Examples: Steel (Fe + C), TiH₂</p>
                  </div>
                </div>
                <div className="bg-pink-50 p-4 rounded-lg">
                  <h3 className="text-lg font-bold text-pink-800 mb-2">Alloy Formation</h3>
                  <div className="bg-pink-100 p-3 rounded">
                    <p className="text-sm text-gray-700">• Similar atomic sizes allow substitution</p>
                    <p className="text-sm text-gray-700">• Enhanced properties</p>
                    <p className="text-sm text-gray-900 font-semibold">Examples: Brass (Cu + Zn), Bronze (Cu + Sn)</p>
                  </div>
                </div>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4 border-b-2 border-blue-200 pb-2">6. Important Compounds: K₂Cr₂O₇ and KMnO₄</h2>
              <div className="space-y-4">
                <div className="bg-orange-50 p-4 rounded-lg">
                  <h3 className="text-lg font-bold text-orange-800 mb-2">Potassium Dichromate (K₂Cr₂O₇)</h3>
                  <div className="space-y-3">
                    <div className="bg-orange-100 p-3 rounded">
                      <p className="text-sm font-semibold text-orange-800">Structure of Cr₂O₇²⁻ ion:</p>
                      <div className="text-center my-3">
                        <svg width="200" height="120" viewBox="0 0 200 120" className="mx-auto">
                          <circle cx="70" cy="60" r="10" fill="#FFA500" stroke="#000" strokeWidth="1"/>
                          <text x="70" y="65" fontSize="10" textAnchor="middle" fill="#000">Cr</text>
                          <circle cx="130" cy="60" r="10" fill="#FFA500" stroke="#000" strokeWidth="1"/>
                          <text x="130" y="65" fontSize="10" textAnchor="middle" fill="#000">Cr</text>
                          <circle cx="100" cy="40" r="6" fill="#FF0000" stroke="#000" strokeWidth="1"/>
                          <text x="100" y="44" fontSize="8" textAnchor="middle" fill="#FFF">O</text>
                          <circle cx="50" cy="40" r="6" fill="#FF0000" stroke="#000" strokeWidth="1"/>
                          <text x="50" y="44" fontSize="8" textAnchor="middle" fill="#FFF">O</text>
                          <circle cx="150" cy="40" r="6" fill="#FF0000" stroke="#000" strokeWidth="1"/>
                          <text x="150" y="44" fontSize="8" textAnchor="middle" fill="#FFF">O</text>
                          <circle cx="50" cy="80" r="6" fill="#FF0000" stroke="#000" strokeWidth="1"/>
                          <text x="50" y="84" fontSize="8" textAnchor="middle" fill="#FFF">O</text>
                          <circle cx="150" cy="80" r="6" fill="#FF0000" stroke="#000" strokeWidth="1"/>
                          <text x="150" y="84" fontSize="8" textAnchor="middle" fill="#FFF">O</text>
                          <circle cx="70" cy="20" r="6" fill="#FF0000" stroke="#000" strokeWidth="1"/>
                          <text x="70" y="24" fontSize="8" textAnchor="middle" fill="#FFF">O</text>
                          <circle cx="130" cy="20" r="6" fill="#FF0000" stroke="#000" strokeWidth="1"/>
                          <text x="130" y="24" fontSize="8" textAnchor="middle" fill="#FFF">O</text>
                          <line x1="76" y1="54" x2="94" y2="46" stroke="#000" strokeWidth="2"/>
                          <line x1="124" y1="54" x2="106" y2="46" stroke="#000" strokeWidth="2"/>
                          <line x1="64" y1="54" x2="56" y2="46" stroke="#000" strokeWidth="2"/>
                          <line x1="136" y1="54" x2="144" y2="46" stroke="#000" strokeWidth="2"/>
                          <line x1="64" y1="66" x2="56" y2="74" stroke="#000" strokeWidth="2"/>
                          <line x1="136" y1="66" x2="144" y2="74" stroke="#000" strokeWidth="2"/>
                          <line x1="70" y1="50" x2="70" y2="26" stroke="#000" strokeWidth="2"/>
                          <line x1="130" y1="50" x2="130" y2="26" stroke="#000" strokeWidth="2"/>
                        </svg>
                      </div>
                      <p className="text-xs text-gray-600 text-center">Bridge structure with shared oxygen</p>
                    </div>
                    <div className="bg-orange-100 p-3 rounded">
                      <p className="text-sm font-semibold text-orange-800">Preparation:</p>
                      <p className="text-sm text-gray-700">4FeCr₂O₄ + 8Na₂CO₃ + 7O₂ → 8Na₂CrO₄ + 2Fe₂O₃ + 8CO₂</p>
                      <p className="text-sm text-gray-700">2Na₂CrO₄ + 2HCl → Na₂Cr₂O₇ + 2NaCl + H₂O</p>
                      <p className="text-sm text-gray-700">Na₂Cr₂O₇ + 2KCl → K₂Cr₂O₇ + 2NaCl</p>
                    </div>
                    <div className="bg-orange-100 p-3 rounded">
                      <p className="text-sm font-semibold text-orange-800">Properties & Uses:</p>
                      <p className="text-sm text-gray-700">• Orange crystalline solid</p>
                      <p className="text-sm text-gray-700">• Strong oxidizing agent</p>
                      <p className="text-sm text-gray-700">• Used in leather tanning, photography</p>
                    </div>
                  </div>
                </div>
                <div className="bg-purple-50 p-4 rounded-lg">
                  <h3 className="text-lg font-bold text-purple-800 mb-2">Potassium Permanganate (KMnO₄)</h3>
                  <div className="space-y-3">
                    <div className="bg-purple-100 p-3 rounded">
                      <p className="text-sm font-semibold text-purple-800">Structure of MnO₄⁻ ion:</p>
                      <div className="text-center my-3">
                        <svg width="120" height="120" viewBox="0 0 120 120" className="mx-auto">
                          <circle cx="60" cy="60" r="10" fill="#800080" stroke="#000" strokeWidth="1"/>
                          <text x="60" y="65" fontSize="10" textAnchor="middle" fill="#FFF">Mn</text>
                          <circle cx="60" cy="25" r="7" fill="#FF0000" stroke="#000" strokeWidth="1"/>
                          <text x="60" y="29" fontSize="8" textAnchor="middle" fill="#FFF">O</text>
                          <circle cx="60" cy="95" r="7" fill="#FF0000" stroke="#000" strokeWidth="1"/>
                          <text x="60" y="99" fontSize="8" textAnchor="middle" fill="#FFF">O</text>
                          <circle cx="25" cy="60" r="7" fill="#FF0000" stroke="#000" strokeWidth="1"/>
                          <text x="25" y="64" fontSize="8" textAnchor="middle" fill="#FFF">O</text>
                          <circle cx="95" cy="60" r="7" fill="#FF0000" stroke="#000" strokeWidth="1"/>
                          <text x="95" y="64" fontSize="8" textAnchor="middle" fill="#FFF">O</text>
                          <line x1="60" y1="50" x2="60" y2="32" stroke="#000" strokeWidth="3"/>
                          <line x1="60" y1="70" x2="60" y2="88" stroke="#000" strokeWidth="3"/>
                          <line x1="50" y1="60" x2="32" y2="60" stroke="#000" strokeWidth="3"/>
                          <line x1="70" y1="60" x2="88" y2="60" stroke="#000" strokeWidth="3"/>
                        </svg>
                      </div>
                      <p className="text-xs text-gray-600 text-center">Tetrahedral structure, Mn in +7 oxidation state</p>
                    </div>
                    <div className="bg-purple-100 p-3 rounded">
                      <p className="text-sm font-semibold text-purple-800">Preparation:</p>
                      <p className="text-sm text-gray-700">2MnO₂ + 4KOH + O₂ → 2K₂MnO₄ + 2H₂O</p>
                      <p className="text-sm text-gray-700">3K₂MnO₄ + 2H₂O → 2KMnO₄ + MnO₂ + 4KOH</p>
                    </div>
                    <div className="bg-purple-100 p-3 rounded">
                      <p className="text-sm font-semibold text-purple-800">Properties & Uses:</p>
                      <p className="text-sm text-gray-700">• Dark purple crystalline solid</p>
                      <p className="text-sm text-gray-700">• Powerful oxidizing agent</p>
                      <p className="text-sm text-gray-700">• Disinfectant, water treatment</p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4 border-b-2 border-blue-200 pb-2">7. Lanthanides (f-Block Elements)</h2>
              <div className="bg-blue-50 p-4 rounded-lg mb-4">
                <h3 className="text-lg font-bold text-blue-800 mb-2">Electronic Configuration & Position</h3>
                <div className="bg-blue-100 p-3 rounded">
                  <p className="text-sm text-gray-700">• Elements 58-71 (Ce to Lu)</p>
                  <p className="text-sm text-gray-700">• General configuration: [Xe] 4f¹⁻¹⁴ 5d⁰⁻¹ 6s²</p>
                  <p className="text-sm text-gray-700">• Also called rare earth elements</p>
                </div>
              </div>
              <div className="space-y-4">
                <div className="bg-green-50 p-4 rounded-lg">
                  <h3 className="text-lg font-bold text-green-800 mb-2">Oxidation States</h3>
                  <div className="bg-green-100 p-3 rounded">
                    <p className="text-sm text-gray-700">• Most common: +3</p>
                    <p className="text-sm text-gray-700">• Ce⁴⁺, Eu²⁺, Yb²⁺ also stable</p>
                    <p className="text-sm text-gray-900 font-semibold">Reason: Similar ionization energies</p>
                  </div>
                </div>
                <div className="bg-yellow-50 p-4 rounded-lg">
                  <h3 className="text-lg font-bold text-yellow-800 mb-2">Lanthanide Contraction</h3>
                  <div className="bg-yellow-100 p-3 rounded">
                    <p className="text-sm text-gray-700">• Gradual decrease in atomic/ionic radii</p>
                    <p className="text-sm text-gray-700">• Due to poor shielding by 4f electrons</p>
                    <p className="text-sm text-gray-900 font-semibold">Consequences: Similar properties of 2nd and 3rd transition series</p>
                  </div>
                </div>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4 border-b-2 border-blue-200 pb-2">8. Actinides</h2>
              <div className="bg-red-50 p-4 rounded-lg mb-4">
                <h3 className="text-lg font-bold text-red-800 mb-2">Electronic Configuration</h3>
                <div className="bg-red-100 p-3 rounded">
                  <p className="text-sm text-gray-700">• Elements 89-103 (Ac to Lr)</p>
                  <p className="text-sm text-gray-700">• General configuration: [Rn] 5f¹⁻¹⁴ 6d⁰⁻¹ 7s²</p>
                  <p className="text-sm text-gray-700">• All are radioactive</p>
                </div>
              </div>
              <div className="bg-teal-50 p-4 rounded-lg">
                <h3 className="text-lg font-bold text-teal-800 mb-2">Comparison with Lanthanides</h3>
                <div className="grid md:grid-cols-2 gap-4 text-sm">
                  <div className="bg-teal-100 p-3 rounded">
                    <p className="font-semibold text-teal-800">Similarities:</p>
                    <p>• f-block elements</p>
                    <p>• Similar chemical properties</p>
                    <p>• Actinide contraction</p>
                  </div>
                  <div className="bg-teal-100 p-3 rounded">
                    <p className="font-semibold text-teal-800">Differences:</p>
                    <p>• More variable oxidation states</p>
                    <p>• All radioactive</p>
                    <p>• 5f orbitals less shielded</p>
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
                      <p><strong>Q1.</strong> Electronic configuration of Cr is: (a) [Ar] 3d⁴ 4s² (b) [Ar] 3d⁵ 4s¹ (c) [Ar] 3d⁶ 4s⁰</p>
                      <p className="text-green-600 font-semibold">Answer: (b) [Ar] 3d⁵ 4s¹</p>
                    </div>
                    <div className="bg-blue-100 p-2 rounded">
                      <p><strong>Q2.</strong> Most common oxidation state of lanthanides: (a) +2 (b) +3 (c) +4</p>
                      <p className="text-green-600 font-semibold">Answer: (b) +3</p>
                    </div>
                    <div className="bg-blue-100 p-2 rounded">
                      <p><strong>Q3.</strong> Color of KMnO₄ is: (a) Orange (b) Purple (c) Yellow</p>
                      <p className="text-green-600 font-semibold">Answer: (b) Purple</p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-green-50 p-4 rounded-lg">
                  <h3 className="font-bold mb-3 text-green-800">2-3 Mark Questions:</h3>
                  <div className="space-y-3 text-sm">
                    <div className="bg-green-100 p-3 rounded">
                      <p className="font-semibold">Q1. Explain lanthanide contraction and its consequences.</p>
                      <p className="text-gray-700 mt-1"><strong>Answer:</strong> Gradual decrease in size due to poor shielding by 4f electrons. Consequences: Similar properties of 2nd and 3rd transition series, difficulty in separation.</p>
                    </div>
                    <div className="bg-green-100 p-3 rounded">
                      <p className="font-semibold">Q2. Why do transition metals show variable oxidation states?</p>
                      <p className="text-gray-700 mt-1"><strong>Answer:</strong> Small difference in ionization energies of (n-1)d and ns electrons allows removal of different numbers of electrons.</p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-purple-50 p-4 rounded-lg">
                  <h3 className="font-bold mb-3 text-purple-800">5 Mark Questions:</h3>
                  <div className="space-y-3 text-sm">
                    <div className="bg-purple-100 p-3 rounded">
                      <p className="font-semibold">Q1. Describe the preparation and properties of K₂Cr₂O₇.</p>
                      <p className="text-gray-700 mt-1"><strong>Answer:</strong> Preparation from chromite ore, roasting with Na₂CO₃, conversion to dichromate. Properties: Orange crystals, oxidizing agent, used in leather tanning.</p>
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
                    <p className="font-semibold text-yellow-800">3d Series Elements:</p>
                    <p className="text-gray-700">"<strong>S</strong>cary <strong>T</strong>igers <strong>V</strong>ery <strong>C</strong>ruel, <strong>M</strong>an <strong>F</strong>ears <strong>C</strong>obra <strong>N</strong>ear <strong>C</strong>opper <strong>Z</strong>oo"</p>
                    <p className="text-gray-700">Sc Ti V Cr Mn Fe Co Ni Cu Zn</p>
                  </div>
                  <div className="bg-yellow-100 p-3 rounded">
                    <p className="font-semibold text-yellow-800">Electronic Configuration Exceptions:</p>
                    <p className="text-gray-700">"<strong>C</strong>r and <strong>C</strong>u are <strong>C</strong>razy" - Half-filled and fully-filled d-orbitals are stable</p>
                  </div>
                  <div className="bg-yellow-100 p-3 rounded">
                    <p className="font-semibold text-yellow-800">Oxidation States:</p>
                    <p className="text-gray-700">"<strong>M</strong>anganese <strong>M</strong>akes <strong>M</strong>aximum" - Mn shows maximum oxidation states (+2 to +7)</p>
                  </div>
                  <div className="bg-yellow-100 p-3 rounded">
                    <p className="font-semibold text-yellow-800">Lanthanides vs Actinides:</p>
                    <p className="text-gray-700">"<strong>L</strong>anthanides are <strong>L</strong>ess <strong>R</strong>adioactive, <strong>A</strong>ctinides are <strong>A</strong>ll <strong>R</strong>adioactive"</p>
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
                      <p className="font-semibold text-indigo-800">Key Properties:</p>
                      <p>• Variable oxidation states</p>
                      <p>• Colored compounds</p>
                      <p>• Catalytic activity</p>
                      <p>• Magnetic properties</p>
                    </div>
                    <div className="bg-indigo-100 p-2 rounded">
                      <p className="font-semibold text-indigo-800">Important Compounds:</p>
                      <p>• K₂Cr₂O₇ - Orange, oxidizing</p>
                      <p>• KMnO₄ - Purple, oxidizing</p>
                      <p>• Both used as oxidizing agents</p>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="bg-indigo-100 p-2 rounded">
                      <p className="font-semibold text-indigo-800">f-Block Elements:</p>
                      <p>• Lanthanides: 4f series</p>
                      <p>• Actinides: 5f series</p>
                      <p>• Lanthanide contraction</p>
                      <p>• All actinides radioactive</p>
                    </div>
                    <div className="bg-indigo-100 p-2 rounded">
                      <p className="font-semibold text-indigo-800">Common Mistakes:</p>
                      <p>• Cr, Cu electronic configuration</p>
                      <p>• Confusing lanthanides/actinides</p>
                      <p>• Oxidation state calculations</p>
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
                    <p className="text-gray-700">• Electronic configuration questions: 1-2 minutes</p>
                    <p className="text-gray-700">• Properties comparison: 3-4 minutes</p>
                    <p className="text-gray-700">• Compound preparation: 5-6 minutes</p>
                    <p className="text-gray-700">• Focus on K₂Cr₂O₇ and KMnO₄ - frequently asked!</p>
                  </div>
                  <div className="bg-orange-100 p-3 rounded">
                    <p className="font-semibold text-orange-800">High-Scoring Topics:</p>
                    <p className="text-gray-700">• Electronic configurations (2-3 marks)</p>
                    <p className="text-gray-700">• Lanthanide contraction (3-5 marks)</p>
                    <p className="text-gray-700">• K₂Cr₂O₇/KMnO₄ preparation (5 marks)</p>
                    <p className="text-gray-700">• Transition metal properties (3-5 marks)</p>
                  </div>
                  <div className="bg-orange-100 p-3 rounded">
                    <p className="font-semibold text-orange-800">Answer Writing Tips:</p>
                    <p className="text-gray-700">• Write electronic configurations clearly</p>
                    <p className="text-gray-700">• Include balanced chemical equations</p>
                    <p className="text-gray-700">• Mention specific examples</p>
                    <p className="text-gray-700">• Draw clear diagrams for orbital filling</p>
                  </div>
                </div>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4 border-b-2 border-blue-200 pb-2">13. Important Formulas & Data</h2>
              <div className="bg-slate-50 p-4 rounded-lg">
                <div className="grid md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <h3 className="font-semibold mb-2 text-slate-800">Electronic Configurations:</h3>
                    <ul className="space-y-1">
                      <li>• General: (n-1)d¹⁻¹⁰ ns¹⁻²</li>
                      <li>• Cr: [Ar] 3d⁵ 4s¹</li>
                      <li>• Cu: [Ar] 3d¹⁰ 4s¹</li>
                      <li>• Lanthanides: [Xe] 4f¹⁻¹⁴ 6s²</li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2 text-slate-800">Magnetic Moment:</h3>
                    <ul className="space-y-1">
                      <li>• μ = √n(n+2) BM</li>
                      <li>• n = number of unpaired electrons</li>
                      <li>• Paramagnetic: μ &gt; 0</li>
                      <li>• Diamagnetic: μ = 0</li>
                    </ul>
                  </div>
                </div>
                <div className="mt-4 bg-slate-100 p-3 rounded">
                  <h3 className="font-semibold mb-2 text-slate-800">Important Data:</h3>
                  <p className="text-sm text-gray-700">Atomic numbers: Lanthanides (58-71), Actinides (89-103) | Common oxidation states: +2, +3, +4, +5, +6, +7</p>
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