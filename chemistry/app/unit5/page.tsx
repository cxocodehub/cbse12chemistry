'use client'

import { useRef, useEffect, useState } from 'react'

export default function Unit5() {
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
      
      pdf.save('CBSE-Class12-Chemistry-Unit5-Coordination-Compounds.pdf')
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
              <a href="/unit5" className="w-8 h-8 bg-yellow-500 text-white rounded-full flex items-center justify-center text-sm" title="Coordination Compounds">5</a>
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
              <h1 className="text-3xl font-bold text-blue-800">CBSE Board Class 12 Chemistry</h1>
              <h2 className="text-xl font-semibold text-gray-700 mt-2">Unit 5: Coordination Compounds - Complete Notes</h2>
            </div>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4 border-b-2 border-blue-200 pb-2">1. Introduction to Coordination Compounds</h2>
              <div className="bg-blue-50 p-4 rounded-lg mb-4">
                <h3 className="text-lg font-bold text-blue-800 mb-2">Definition & Examples</h3>
                <p className="text-sm mb-2">Compounds containing central metal atom/ion surrounded by ligands</p>
                <div className="bg-blue-100 p-3 rounded">
                  <p className="text-sm font-semibold text-blue-800">Examples:</p>
                  <p className="text-sm text-gray-700">• [Cu(NH₃)₄]SO₄ - Tetraamminecopper(II) sulfate</p>
                  <p className="text-sm text-gray-700">• K₄[Fe(CN)₆] - Potassium hexacyanoferrate(II)</p>
                  <p className="text-sm text-gray-700">• [Co(NH₃)₆]Cl₃ - Hexaamminecobalt(III) chloride</p>
                </div>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4 border-b-2 border-blue-200 pb-2">2. Ligands & Coordination Number</h2>
              <div className="space-y-4">
                <div className="bg-green-50 p-4 rounded-lg">
                  <h3 className="text-lg font-bold text-green-800 mb-2">Types of Ligands</h3>
                  <div className="grid md:grid-cols-2 gap-4 text-sm">
                    <div className="bg-green-100 p-3 rounded">
                      <p className="font-semibold text-green-800">Monodentate:</p>
                      <p>• One donor atom</p>
                      <p>• Examples: Cl⁻, NH₃, H₂O, CN⁻</p>
                    </div>
                    <div className="bg-green-100 p-3 rounded">
                      <p className="font-semibold text-green-800">Polydentate:</p>
                      <p>• Multiple donor atoms</p>
                      <p>• Bidentate: en, ox²⁻</p>
                      <p>• Hexadentate: EDTA⁴⁻</p>
                    </div>
                  </div>
                </div>
                <div className="bg-yellow-50 p-4 rounded-lg">
                  <h3 className="text-lg font-bold text-yellow-800 mb-2">Coordination Number</h3>
                  <div className="bg-yellow-100 p-3 rounded">
                    <p className="text-sm text-gray-700">• Number of ligand atoms directly bonded to central metal</p>
                    <p className="text-sm text-gray-700">• Common values: 2, 4, 6</p>
                    <p className="text-sm text-gray-900 font-semibold">Example: [Cu(NH₃)₄]²⁺ has coordination number 4</p>
                  </div>
                </div>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4 border-b-2 border-blue-200 pb-2">3. IUPAC Nomenclature</h2>
              <div className="bg-purple-50 p-4 rounded-lg">
                <h3 className="text-lg font-bold text-purple-800 mb-2">Naming Rules</h3>
                <div className="space-y-3 text-sm">
                  <div className="bg-purple-100 p-3 rounded">
                    <p className="font-semibold text-purple-800">Order of Naming:</p>
                    <p>1. Cation first, then anion</p>
                    <p>2. Ligands in alphabetical order</p>
                    <p>3. Central metal with oxidation state</p>
                  </div>
                  <div className="bg-purple-100 p-3 rounded">
                    <p className="font-semibold text-purple-800">Prefixes for Ligands:</p>
                    <p>• mono-, di-, tri-, tetra-, penta-, hexa-</p>
                    <p>• bis-, tris-, tetrakis- (for complex ligands)</p>
                  </div>
                  <div className="bg-purple-100 p-3 rounded">
                    <p className="font-semibold text-purple-800">Examples:</p>
                    <p>• [Cr(H₂O)₆]Cl₃ → Hexaaquachromium(III) chloride</p>
                    <p>• K₃[Fe(CN)₆] → Potassium hexacyanoferrate(III)</p>
                  </div>
                </div>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4 border-b-2 border-blue-200 pb-2">4. Werner's Theory</h2>
              <div className="bg-orange-50 p-4 rounded-lg">
                <h3 className="text-lg font-bold text-orange-800 mb-2">Main Postulates</h3>
                <div className="space-y-3 text-sm">
                  <div className="bg-orange-100 p-3 rounded">
                    <p className="font-semibold text-orange-800">Primary Valency:</p>
                    <p>• Ionizable, satisfied by anions</p>
                    <p>• Equals oxidation state of metal</p>
                  </div>
                  <div className="bg-orange-100 p-3 rounded">
                    <p className="font-semibold text-orange-800">Secondary Valency:</p>
                    <p>• Non-ionizable, satisfied by ligands</p>
                    <p>• Equals coordination number</p>
                    <p>• Directional in nature</p>
                  </div>
                  <div className="bg-orange-100 p-3 rounded">
                    <p className="font-semibold text-orange-800">Example: [Co(NH₃)₆]Cl₃</p>
                    <p>• Primary valency = 3 (Co³⁺)</p>
                    <p>• Secondary valency = 6 (six NH₃)</p>
                  </div>
                </div>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4 border-b-2 border-blue-200 pb-2">5. Bonding Theories</h2>
              <div className="space-y-4">
                <div className="bg-red-50 p-4 rounded-lg">
                  <h3 className="text-lg font-bold text-red-800 mb-2">Valence Bond Theory (VBT)</h3>
                  <div className="bg-red-100 p-3 rounded">
                    <p className="text-sm text-gray-700">• Metal uses hybrid orbitals for bonding</p>
                    <p className="text-sm text-gray-700">• Ligands donate electron pairs</p>
                    <p className="text-sm text-gray-900 font-semibold">Limitations: Cannot explain color and magnetic properties</p>
                  </div>
                </div>
                <div className="bg-teal-50 p-4 rounded-lg">
                  <h3 className="text-lg font-bold text-teal-800 mb-2">Crystal Field Theory (CFT)</h3>
                  <div className="space-y-2 text-sm">
                    <p>• Ligands create electrostatic field</p>
                    <p>• d-orbitals split into different energy levels</p>
                    <div className="bg-teal-100 p-3 rounded">
                      <p className="font-semibold text-teal-800">Octahedral Splitting:</p>
                      <p>• t₂g (lower energy): dxy, dxz, dyz</p>
                      <p>• eg (higher energy): dx²-y², dz²</p>
                      <p>• Δo = crystal field splitting energy</p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4 border-b-2 border-blue-200 pb-2">6. Color & Magnetic Properties</h2>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-indigo-50 p-4 rounded-lg">
                  <h3 className="text-lg font-bold text-indigo-800 mb-2">Color</h3>
                  <div className="bg-indigo-100 p-3 rounded">
                    <p className="text-sm text-gray-700">• Due to d-d transitions</p>
                    <p className="text-sm text-gray-700">• Energy = hν = Δ</p>
                    <p className="text-sm text-gray-900 font-semibold">Colorless: d⁰ and d¹⁰ complexes</p>
                  </div>
                </div>
                <div className="bg-cyan-50 p-4 rounded-lg">
                  <h3 className="text-lg font-bold text-cyan-800 mb-2">Magnetism</h3>
                  <div className="bg-cyan-100 p-3 rounded">
                    <p className="text-sm text-gray-700">• High spin: weak field ligands</p>
                    <p className="text-sm text-gray-700">• Low spin: strong field ligands</p>
                    <p className="text-sm text-gray-900 font-semibold">μ = √n(n+2) BM</p>
                  </div>
                </div>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4 border-b-2 border-blue-200 pb-2">7. Shapes of Coordination Compounds</h2>
              <div className="bg-lime-50 p-4 rounded-lg">
                <h3 className="text-lg font-bold text-lime-800 mb-2">Common Geometries with Structures</h3>
                <div className="grid md:grid-cols-2 gap-4 text-sm">
                  <div className="space-y-4">
                    <div className="bg-lime-100 p-3 rounded">
                      <p className="font-semibold text-lime-800">Linear (CN = 2): [Ag(NH₃)₂]⁺</p>
                      <div className="text-center my-3">
                        <svg width="200" height="60" viewBox="0 0 200 60" className="mx-auto">
                          <circle cx="100" cy="30" r="8" fill="#C0C0C0" stroke="#000" strokeWidth="1"/>
                          <text x="100" y="35" fontSize="10" textAnchor="middle" fill="#000">Ag</text>
                          <circle cx="50" cy="30" r="6" fill="#87CEEB" stroke="#000" strokeWidth="1"/>
                          <text x="50" y="34" fontSize="8" textAnchor="middle" fill="#000">NH₃</text>
                          <circle cx="150" cy="30" r="6" fill="#87CEEB" stroke="#000" strokeWidth="1"/>
                          <text x="150" y="34" fontSize="8" textAnchor="middle" fill="#000">NH₃</text>
                          <line x1="58" y1="30" x2="92" y2="30" stroke="#000" strokeWidth="2"/>
                          <line x1="108" y1="30" x2="142" y2="30" stroke="#000" strokeWidth="2"/>
                        </svg>
                      </div>
                      <p className="text-xs text-gray-600">Bond angle: 180°</p>
                    </div>
                    <div className="bg-lime-100 p-3 rounded">
                      <p className="font-semibold text-lime-800">Square Planar (CN = 4): [PtCl₄]²⁻</p>
                      <div className="text-center my-3">
                        <svg width="120" height="120" viewBox="0 0 120 120" className="mx-auto">
                          <circle cx="60" cy="60" r="8" fill="#DAA520" stroke="#000" strokeWidth="1"/>
                          <text x="60" y="65" fontSize="10" textAnchor="middle" fill="#000">Pt</text>
                          <circle cx="60" cy="30" r="6" fill="#90EE90" stroke="#000" strokeWidth="1"/>
                          <text x="60" y="34" fontSize="8" textAnchor="middle" fill="#000">Cl</text>
                          <circle cx="60" cy="90" r="6" fill="#90EE90" stroke="#000" strokeWidth="1"/>
                          <text x="60" y="94" fontSize="8" textAnchor="middle" fill="#000">Cl</text>
                          <circle cx="30" cy="60" r="6" fill="#90EE90" stroke="#000" strokeWidth="1"/>
                          <text x="30" y="64" fontSize="8" textAnchor="middle" fill="#000">Cl</text>
                          <circle cx="90" cy="60" r="6" fill="#90EE90" stroke="#000" strokeWidth="1"/>
                          <text x="90" y="64" fontSize="8" textAnchor="middle" fill="#000">Cl</text>
                          <line x1="60" y1="38" x2="60" y2="52" stroke="#000" strokeWidth="2"/>
                          <line x1="60" y1="68" x2="60" y2="82" stroke="#000" strokeWidth="2"/>
                          <line x1="38" y1="60" x2="52" y2="60" stroke="#000" strokeWidth="2"/>
                          <line x1="68" y1="60" x2="82" y2="60" stroke="#000" strokeWidth="2"/>
                        </svg>
                      </div>
                      <p className="text-xs text-gray-600">Bond angle: 90°</p>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="bg-lime-100 p-3 rounded">
                      <p className="font-semibold text-lime-800">Tetrahedral (CN = 4): [Ni(CO)₄]</p>
                      <div className="text-center my-3">
                        <svg width="120" height="120" viewBox="0 0 120 120" className="mx-auto">
                          <circle cx="60" cy="60" r="8" fill="#90EE90" stroke="#000" strokeWidth="1"/>
                          <text x="60" y="65" fontSize="10" textAnchor="middle" fill="#000">Ni</text>
                          <circle cx="45" cy="45" r="6" fill="#FFB6C1" stroke="#000" strokeWidth="1"/>
                          <text x="45" y="49" fontSize="7" textAnchor="middle" fill="#000">CO</text>
                          <circle cx="75" cy="45" r="6" fill="#FFB6C1" stroke="#000" strokeWidth="1"/>
                          <text x="75" y="49" fontSize="7" textAnchor="middle" fill="#000">CO</text>
                          <circle cx="45" cy="75" r="6" fill="#FFB6C1" stroke="#000" strokeWidth="1"/>
                          <text x="45" y="79" fontSize="7" textAnchor="middle" fill="#000">CO</text>
                          <circle cx="75" cy="75" r="6" fill="#FFB6C1" stroke="#000" strokeWidth="1"/>
                          <text x="75" y="79" fontSize="7" textAnchor="middle" fill="#000">CO</text>
                          <line x1="51" y1="51" x2="54" y2="54" stroke="#000" strokeWidth="2"/>
                          <line x1="69" y1="51" x2="66" y2="54" stroke="#000" strokeWidth="2"/>
                          <line x1="51" y1="69" x2="54" y2="66" stroke="#000" strokeWidth="2"/>
                          <line x1="69" y1="69" x2="66" y2="66" stroke="#000" strokeWidth="2"/>
                        </svg>
                      </div>
                      <p className="text-xs text-gray-600">Bond angle: 109.5°</p>
                    </div>
                    <div className="bg-lime-100 p-3 rounded">
                      <p className="font-semibold text-lime-800">Octahedral (CN = 6): [Co(NH₃)₆]³⁺</p>
                      <div className="text-center my-3">
                        <svg width="120" height="120" viewBox="0 0 120 120" className="mx-auto">
                          <circle cx="60" cy="60" r="8" fill="#FF69B4" stroke="#000" strokeWidth="1"/>
                          <text x="60" y="65" fontSize="10" textAnchor="middle" fill="#000">Co</text>
                          <circle cx="60" cy="25" r="5" fill="#87CEEB" stroke="#000" strokeWidth="1"/>
                          <text x="60" y="28" fontSize="6" textAnchor="middle" fill="#000">NH₃</text>
                          <circle cx="60" cy="95" r="5" fill="#87CEEB" stroke="#000" strokeWidth="1"/>
                          <text x="60" y="98" fontSize="6" textAnchor="middle" fill="#000">NH₃</text>
                          <circle cx="25" cy="60" r="5" fill="#87CEEB" stroke="#000" strokeWidth="1"/>
                          <text x="25" y="63" fontSize="6" textAnchor="middle" fill="#000">NH₃</text>
                          <circle cx="95" cy="60" r="5" fill="#87CEEB" stroke="#000" strokeWidth="1"/>
                          <text x="95" y="63" fontSize="6" textAnchor="middle" fill="#000">NH₃</text>
                          <circle cx="40" cy="40" r="5" fill="#87CEEB" stroke="#000" strokeWidth="1"/>
                          <text x="40" y="43" fontSize="6" textAnchor="middle" fill="#000">NH₃</text>
                          <circle cx="80" cy="80" r="5" fill="#87CEEB" stroke="#000" strokeWidth="1"/>
                          <text x="80" y="83" fontSize="6" textAnchor="middle" fill="#000">NH₃</text>
                          <line x1="60" y1="30" x2="60" y2="52" stroke="#000" strokeWidth="1.5"/>
                          <line x1="60" y1="68" x2="60" y2="90" stroke="#000" strokeWidth="1.5"/>
                          <line x1="30" y1="60" x2="52" y2="60" stroke="#000" strokeWidth="1.5"/>
                          <line x1="68" y1="60" x2="90" y2="60" stroke="#000" strokeWidth="1.5"/>
                          <line x1="45" y1="45" x2="55" y2="55" stroke="#000" strokeWidth="1.5"/>
                          <line x1="65" y1="65" x2="75" y2="75" stroke="#000" strokeWidth="1.5"/>
                        </svg>
                      </div>
                      <p className="text-xs text-gray-600">Bond angle: 90°</p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4 border-b-2 border-blue-200 pb-2">8. Isomerism in Coordination Compounds</h2>
              <div className="space-y-4">
                <div className="bg-pink-50 p-4 rounded-lg">
                  <h3 className="text-lg font-bold text-pink-800 mb-2">Structural Isomerism</h3>
                  <div className="grid md:grid-cols-2 gap-4 text-sm">
                    <div className="bg-pink-100 p-3 rounded">
                      <p className="font-semibold text-pink-800">Linkage Isomerism:</p>
                      <p>• Ambidentate ligands</p>
                      <p>• Example: [Co(NH₃)₅(NO₂)]²⁺ and [Co(NH₃)₅(ONO)]²⁺</p>
                    </div>
                    <div className="bg-pink-100 p-3 rounded">
                      <p className="font-semibold text-pink-800">Coordination Isomerism:</p>
                      <p>• Exchange of ligands</p>
                      <p>• Example: [Co(NH₃)₆][Cr(CN)₆] and [Cr(NH₃)₆][Co(CN)₆]</p>
                    </div>
                  </div>
                </div>
                <div className="bg-violet-50 p-4 rounded-lg">
                  <h3 className="text-lg font-bold text-violet-800 mb-2">Stereoisomerism</h3>
                  <div className="grid md:grid-cols-2 gap-4 text-sm">
                    <div className="bg-violet-100 p-3 rounded">
                      <p className="font-semibold text-violet-800">Geometrical Isomerism:</p>
                      <p>• Cis-trans isomers</p>
                      <p>• Square planar and octahedral</p>
                      <p>• Example: [PtCl₂(NH₃)₂]</p>
                    </div>
                    <div className="bg-violet-100 p-3 rounded">
                      <p className="font-semibold text-violet-800">Optical Isomerism:</p>
                      <p>• Non-superimposable mirror images</p>
                      <p>• Chiral complexes</p>
                      <p>• Example: [Co(en)₃]³⁺</p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4 border-b-2 border-blue-200 pb-2">9. Applications of Coordination Compounds</h2>
              <div className="space-y-4">
                <div className="bg-emerald-50 p-4 rounded-lg">
                  <h3 className="text-lg font-bold text-emerald-800 mb-2">Industrial Applications</h3>
                  <div className="bg-emerald-100 p-3 rounded text-sm">
                    <p>• <strong>Extraction of metals:</strong> [Ag(CN)₂]⁻ in silver extraction</p>
                    <p>• <strong>Electroplating:</strong> [Ag(CN)₂]⁻ for silver plating</p>
                    <p>• <strong>Catalysis:</strong> Wilkinson's catalyst [RhCl(PPh₃)₃]</p>
                  </div>
                </div>
                <div className="bg-rose-50 p-4 rounded-lg">
                  <h3 className="text-lg font-bold text-rose-800 mb-2">Biological Systems</h3>
                  <div className="bg-rose-100 p-3 rounded text-sm">
                    <p>• <strong>Hemoglobin:</strong> Fe²⁺ complex for oxygen transport</p>
                    <p>• <strong>Chlorophyll:</strong> Mg²⁺ complex in photosynthesis</p>
                    <p>• <strong>Vitamin B₁₂:</strong> Co³⁺ complex</p>
                  </div>
                </div>
                <div className="bg-amber-50 p-4 rounded-lg">
                  <h3 className="text-lg font-bold text-amber-800 mb-2">Analytical Chemistry</h3>
                  <div className="bg-amber-100 p-3 rounded text-sm">
                    <p>• <strong>EDTA titrations:</strong> Estimation of metal ions</p>
                    <p>• <strong>Qualitative analysis:</strong> Color reactions</p>
                    <p>• <strong>Separation:</strong> Ion exchange chromatography</p>
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
                      <p><strong>Q1.</strong> EDTA is: (a) Bidentate (b) Tridentate (c) Hexadentate (d) Monodentate</p>
                      <p className="text-green-600 font-semibold">Answer: (c) Hexadentate</p>
                    </div>
                    <div className="bg-blue-100 p-2 rounded">
                      <p><strong>Q2.</strong> Coordination number of Ni in [Ni(CO)₄]: (a) 2 (b) 4 (c) 6 (d) 8</p>
                      <p className="text-green-600 font-semibold">Answer: (b) 4</p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-green-50 p-4 rounded-lg">
                  <h3 className="font-bold mb-3 text-green-800">2-3 Mark Questions:</h3>
                  <div className="space-y-3 text-sm">
                    <div className="bg-green-100 p-3 rounded">
                      <p className="font-semibold">Q1. Write IUPAC name of [Co(NH₃)₆]Cl₃</p>
                      <p className="text-gray-700 mt-1"><strong>Answer:</strong> Hexaamminecobalt(III) chloride</p>
                    </div>
                    <div className="bg-green-100 p-3 rounded">
                      <p className="font-semibold">Q2. Explain Werner's theory of coordination compounds.</p>
                      <p className="text-gray-700 mt-1"><strong>Answer:</strong> Primary valency (ionizable), Secondary valency (non-ionizable, directional), coordination sphere concept.</p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-purple-50 p-4 rounded-lg">
                  <h3 className="font-bold mb-3 text-purple-800">5 Mark Questions:</h3>
                  <div className="space-y-3 text-sm">
                    <div className="bg-purple-100 p-3 rounded">
                      <p className="font-semibold">Q1. Explain crystal field theory for octahedral complexes. Draw energy level diagram.</p>
                      <p className="text-gray-700 mt-1"><strong>Answer:</strong> d-orbital splitting, t₂g and eg levels, crystal field splitting energy Δo, high spin vs low spin complexes.</p>
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
                    <p className="font-semibold text-yellow-800">Ligand Types:</p>
                    <p className="text-gray-700">"<strong>M</strong>ono <strong>B</strong>i <strong>T</strong>ri <strong>H</strong>exa" - Monodentate, Bidentate, Tridentate, Hexadentate</p>
                  </div>
                  <div className="bg-yellow-100 p-3 rounded">
                    <p className="font-semibold text-yellow-800">IUPAC Naming Order:</p>
                    <p className="text-gray-700">"<strong>L</strong>igands <strong>A</strong>lphabetically, <strong>M</strong>etal <strong>L</strong>ast" - LAM-L</p>
                  </div>
                  <div className="bg-yellow-100 p-3 rounded">
                    <p className="font-semibold text-yellow-800">Crystal Field Splitting:</p>
                    <p className="text-gray-700">"<strong>T</strong>wo <strong>G</strong>o <strong>D</strong>own, <strong>E</strong>ight <strong>G</strong>o <strong>U</strong>p" - t₂g (lower), eg (upper)</p>
                  </div>
                  <div className="bg-yellow-100 p-3 rounded">
                    <p className="font-semibold text-yellow-800">Coordination Numbers:</p>
                    <p className="text-gray-700">"<strong>2</strong> <strong>L</strong>inear, <strong>4</strong> <strong>S</strong>quare/<strong>T</strong>etrahedral, <strong>6</strong> <strong>O</strong>ctahedral"</p>
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
                      <p className="font-semibold text-indigo-800">Key Concepts:</p>
                      <p>• Central metal + ligands</p>
                      <p>• Coordination number</p>
                      <p>• Werner's theory</p>
                      <p>• CFT splitting</p>
                    </div>
                    <div className="bg-indigo-100 p-2 rounded">
                      <p className="font-semibold text-indigo-800">Important Ligands:</p>
                      <p>• NH₃, H₂O, Cl⁻, CN⁻</p>
                      <p>• en (bidentate)</p>
                      <p>• EDTA (hexadentate)</p>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="bg-indigo-100 p-2 rounded">
                      <p className="font-semibold text-indigo-800">Isomerism Types:</p>
                      <p>• Structural: linkage, coordination</p>
                      <p>• Stereoisomerism: geometrical, optical</p>
                      <p>• Cis-trans in square planar</p>
                    </div>
                    <div className="bg-indigo-100 p-2 rounded">
                      <p className="font-semibold text-indigo-800">Common Mistakes:</p>
                      <p>• IUPAC naming order</p>
                      <p>• Coordination number confusion</p>
                      <p>• Oxidation state calculation</p>
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
                    <p className="font-semibold text-orange-800">Time Management (Unit weightage: 7 marks):</p>
                    <p className="text-gray-700">• IUPAC naming: 2-3 minutes</p>
                    <p className="text-gray-700">• Isomerism questions: 4-5 minutes</p>
                    <p className="text-gray-700">• CFT theory: 6-8 minutes</p>
                    <p className="text-gray-700">• Always attempt nomenclature - easy marks!</p>
                  </div>
                  <div className="bg-orange-100 p-3 rounded">
                    <p className="font-semibold text-orange-800">High-Scoring Topics:</p>
                    <p className="text-gray-700">• IUPAC nomenclature (guaranteed 2-3 marks)</p>
                    <p className="text-gray-700">• Werner's theory (3-5 marks)</p>
                    <p className="text-gray-700">• Isomerism types (3-5 marks)</p>
                    <p className="text-gray-700">• Crystal field theory (5 marks)</p>
                  </div>
                  <div className="bg-orange-100 p-3 rounded">
                    <p className="font-semibold text-orange-800">Answer Writing Tips:</p>
                    <p className="text-gray-700">• Write systematic IUPAC names</p>
                    <p className="text-gray-700">• Draw clear structural diagrams</p>
                    <p className="text-gray-700">• Show electron configurations</p>
                    <p className="text-gray-700">• Include energy level diagrams</p>
                  </div>
                </div>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4 border-b-2 border-blue-200 pb-2">14. Important Formulas & Data</h2>
              <div className="bg-slate-50 p-4 rounded-lg">
                <div className="grid md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <h3 className="font-semibold mb-2 text-slate-800">Key Formulas:</h3>
                    <ul className="space-y-1">
                      <li>• Magnetic moment: μ = √n(n+2) BM</li>
                      <li>• Crystal field stabilization energy</li>
                      <li>• Coordination number = number of ligand atoms</li>
                      <li>• Oxidation state calculation</li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2 text-slate-800">Common Ligands:</h3>
                    <ul className="space-y-1">
                      <li>• Monodentate: NH₃, H₂O, Cl⁻, CN⁻</li>
                      <li>• Bidentate: en, ox²⁻</li>
                      <li>• Hexadentate: EDTA⁴⁻</li>
                      <li>• Ambidentate: NO₂⁻, SCN⁻</li>
                    </ul>
                  </div>
                </div>
                <div className="mt-4 bg-slate-100 p-3 rounded">
                  <h3 className="font-semibold mb-2 text-slate-800">Important Data:</h3>
                  <p className="text-sm text-gray-700">Common coordination numbers: 2, 4, 6 | Geometries: Linear, tetrahedral, square planar, octahedral</p>
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