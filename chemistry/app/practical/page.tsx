'use client'

import { useRef, useEffect, useState } from 'react'

export default function Practical() {
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
      
      pdf.save('CBSE-Class12-Chemistry-Practical.pdf')
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
            <a href="/unit10" className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm hover:bg-blue-700">10</a>
            <a href="/practical" className="w-8 h-8 bg-yellow-500 text-white rounded-full flex items-center justify-center text-sm">P</a>
          </div>
        </div>
        <div ref={notesRef} className="bg-white p-8 rounded-lg shadow-lg">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-blue-800">CBSE Board Class 12 Chemistry</h1>
            <h2 className="text-xl font-semibold text-gray-700 mt-2">Practical Manual - Complete Guide</h2>
          </div>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 border-b-2 border-blue-200 pb-2">1. Volumetric Analysis</h2>
            <div className="space-y-4">
              <div className="bg-blue-50 p-4 rounded-lg">
                <h3 className="text-lg font-bold text-blue-800 mb-2">Acid-Base Titrations</h3>
                <div className="bg-blue-100 p-3 rounded mt-2">
                  <p className="text-sm font-semibold text-blue-800 mb-1">Strong Acid vs Strong Base:</p>
                  <p className="text-sm text-gray-900 font-semibold">HCl + NaOH → NaCl + H<sub><strong>2</strong></sub>O</p>
                  <p className="text-sm text-gray-700 mt-1">Indicator: Phenolphthalein or Methyl orange</p>
                  
                  <p className="text-sm font-semibold text-blue-800 mb-1 mt-3">Weak Acid vs Strong Base:</p>
                  <p className="text-sm text-gray-900 font-semibold">CH<sub><strong>3</strong></sub>COOH + NaOH → CH<sub><strong>3</strong></sub>COONa + H<sub><strong>2</strong></sub>O</p>
                  <p className="text-sm text-gray-700 mt-1">Indicator: Phenolphthalein</p>
                </div>
              </div>
              
              <div className="bg-green-50 p-4 rounded-lg">
                <h3 className="text-lg font-bold text-green-800 mb-2">Redox Titrations</h3>
                <div className="bg-green-100 p-3 rounded mt-2">
                  <p className="text-sm font-semibold text-green-800 mb-1">Permanganometry:</p>
                  <p className="text-sm text-gray-900 font-semibold">MnO<sub><strong>4</strong></sub><sup><strong>-</strong></sup> + 8H<sup><strong>+</strong></sup> + 5e<sup><strong>-</strong></sup> → Mn<sup><strong>2+</strong></sup> + 4H<sub><strong>2</strong></sub>O</p>
                  <p className="text-sm text-gray-700 mt-1">Self-indicator (pink to colorless)</p>
                  
                  <p className="text-sm font-semibold text-green-800 mb-1 mt-3">Iodometry:</p>
                  <p className="text-sm text-gray-900 font-semibold">I<sub><strong>2</strong></sub> + 2S<sub><strong>2</strong></sub>O<sub><strong>3</strong></sub><sup><strong>2-</strong></sup> → 2I<sup><strong>-</strong></sup> + S<sub><strong>4</strong></sub>O<sub><strong>6</strong></sub><sup><strong>2-</strong></sup></p>
                  <p className="text-sm text-gray-700 mt-1">Indicator: Starch solution</p>
                </div>
              </div>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 border-b-2 border-blue-200 pb-2">2. Salt Analysis (Qualitative Analysis)</h2>
            <div className="space-y-4">
              <div className="bg-red-50 p-4 rounded-lg">
                <h3 className="text-lg font-bold text-red-800 mb-2">Cation Analysis</h3>
                <div className="bg-red-100 p-3 rounded mt-2">
                  <p className="text-sm font-semibold text-red-800 mb-1">Group I (Ag<sup><strong>+</strong></sup>, Pb<sup><strong>2+</strong></sup>, Hg<sub><strong>2</strong></sub><sup><strong>2+</strong></sup>):</p>
                  <p className="text-sm text-gray-700">Precipitated by dilute HCl</p>
                  
                  <p className="text-sm font-semibold text-red-800 mb-1 mt-2">Group II (Cu<sup><strong>2+</strong></sup>, Cd<sup><strong>2+</strong></sup>, Bi<sup><strong>3+</strong></sup>):</p>
                  <p className="text-sm text-gray-700">Precipitated by H<sub><strong>2</strong></sub>S in acidic medium</p>
                  
                  <p className="text-sm font-semibold text-red-800 mb-1 mt-2">Group III (Al<sup><strong>3+</strong></sup>, Fe<sup><strong>3+</strong></sup>, Cr<sup><strong>3+</strong></sup>):</p>
                  <p className="text-sm text-gray-700">Precipitated by NH<sub><strong>4</strong></sub>OH in presence of NH<sub><strong>4</strong></sub>Cl</p>
                </div>
              </div>
              
              <div className="bg-purple-50 p-4 rounded-lg">
                <h3 className="text-lg font-bold text-purple-800 mb-2">Anion Analysis</h3>
                <div className="bg-purple-100 p-3 rounded mt-2">
                  <p className="text-sm font-semibold text-purple-800 mb-1">Carbonate (CO<sub><strong>3</strong></sub><sup><strong>2-</strong></sup>):</p>
                  <p className="text-sm text-gray-700">Effervescence with dilute HCl, CO<sub><strong>2</strong></sub> turns lime water milky</p>
                  
                  <p className="text-sm font-semibold text-purple-800 mb-1 mt-2">Sulphate (SO<sub><strong>4</strong></sub><sup><strong>2-</strong></sup>):</p>
                  <p className="text-sm text-gray-700">White precipitate with BaCl<sub><strong>2</strong></sub> solution</p>
                  
                  <p className="text-sm font-semibold text-purple-800 mb-1 mt-2">Chloride (Cl<sup><strong>-</strong></sup>):</p>
                  <p className="text-sm text-gray-700">White precipitate with AgNO<sub><strong>3</strong></sub>, soluble in NH<sub><strong>4</strong></sub>OH</p>
                </div>
              </div>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 border-b-2 border-blue-200 pb-2">3. Organic Compound Analysis</h2>
            <div className="space-y-4">
              <div className="bg-yellow-50 p-4 rounded-lg">
                <h3 className="text-lg font-bold text-yellow-800 mb-2">Detection of Elements</h3>
                <div className="bg-yellow-100 p-3 rounded mt-2">
                  <p className="text-sm font-semibold text-yellow-800 mb-1">Lassaigne's Test:</p>
                  <ul className="text-sm text-gray-700 space-y-1">
                    <li>• <strong>Nitrogen:</strong> Prussian blue color with FeSO<sub><strong>4</strong></sub> and FeCl<sub><strong>3</strong></sub></li>
                    <li>• <strong>Sulphur:</strong> Violet color with sodium nitroprusside</li>
                    <li>• <strong>Halogens:</strong> Precipitate with AgNO<sub><strong>3</strong></sub> after acidification</li>
                  </ul>
                </div>
              </div>
              
              <div className="bg-orange-50 p-4 rounded-lg">
                <h3 className="text-lg font-bold text-orange-800 mb-2">Functional Group Tests</h3>
                <div className="bg-orange-100 p-3 rounded mt-2">
                  <p className="text-sm font-semibold text-orange-800 mb-1">Alcohols:</p>
                  <p className="text-sm text-gray-700">Lucas test - tertiary alcohols give immediate turbidity</p>
                  
                  <p className="text-sm font-semibold text-orange-800 mb-1 mt-2">Aldehydes:</p>
                  <p className="text-sm text-gray-700">Tollens' test - silver mirror formation</p>
                  
                  <p className="text-sm font-semibold text-orange-800 mb-1 mt-2">Carboxylic Acids:</p>
                  <p className="text-sm text-gray-700">Effervescence with NaHCO<sub><strong>3</strong></sub></p>
                </div>
              </div>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 border-b-2 border-blue-200 pb-2">4. Physical Chemistry Experiments</h2>
            <div className="space-y-4">
              <div className="bg-indigo-50 p-4 rounded-lg">
                <h3 className="text-lg font-bold text-indigo-800 mb-2">pH and Buffer Solutions</h3>
                <div className="bg-indigo-100 p-3 rounded mt-2">
                  <ul className="text-sm text-gray-700 space-y-1">
                    <li>• Measurement of pH using pH meter or indicators</li>
                    <li>• Preparation of buffer solutions</li>
                    <li>• Henderson-Hasselbalch equation applications</li>
                  </ul>
                </div>
              </div>
              
              <div className="bg-teal-50 p-4 rounded-lg">
                <h3 className="text-lg font-bold text-teal-800 mb-2">Electrochemistry</h3>
                <div className="bg-teal-100 p-3 rounded mt-2">
                  <ul className="text-sm text-gray-700 space-y-1">
                    <li>• EMF measurement of galvanic cells</li>
                    <li>• Verification of Nernst equation</li>
                    <li>• Conductivity measurements</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 border-b-2 border-blue-200 pb-2">5. Important Calculations</h2>
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="text-lg font-bold text-gray-800 mb-2">Volumetric Analysis Formulas</h3>
              <div className="bg-gray-100 p-3 rounded mt-2">
                <ul className="text-sm text-gray-700 space-y-1">
                  <li>• <strong>Molarity:</strong> M = (n × 1000) / V(mL)</li>
                  <li>• <strong>Normality:</strong> N = M × n-factor</li>
                  <li>• <strong>At equivalence point:</strong> N<sub><strong>1</strong></sub>V<sub><strong>1</strong></sub> = N<sub><strong>2</strong></sub>V<sub><strong>2</strong></sub></li>
                  <li>• <strong>Percentage purity:</strong> (Actual amount / Theoretical amount) × 100</li>
                </ul>
              </div>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 border-b-2 border-blue-200 pb-2">6. Practical Exam Tips & Strategy</h2>
            <div className="space-y-4">
              <div className="bg-blue-50 p-4 rounded-lg">
                <h3 className="text-lg font-bold text-blue-800 mb-2">📝 Exam Day Strategy</h3>
                <div className="space-y-3 text-sm">
                  <div className="bg-blue-100 p-3 rounded">
                    <h4 className="font-semibold mb-2 text-blue-800">Time Management (3 hours):</h4>
                    <ul className="list-disc list-inside space-y-1">
                      <li><strong>Salt Analysis:</strong> 90 minutes (most marks)</li>
                      <li><strong>Volumetric Analysis:</strong> 60 minutes</li>
                      <li><strong>Organic/Physical:</strong> 45 minutes</li>
                      <li><strong>Viva & Record:</strong> 15 minutes</li>
                    </ul>
                  </div>
                  
                  <div className="bg-green-100 p-3 rounded">
                    <h4 className="font-semibold mb-2 text-green-800">✅ General Guidelines:</h4>
                    <ul className="list-disc list-inside space-y-1">
                      <li>Read all instructions carefully before starting</li>
                      <li>Maintain proper laboratory notebook with observations</li>
                      <li>Handle chemicals and apparatus with care</li>
                      <li>Record observations accurately and immediately</li>
                      <li>Show all calculations with proper units</li>
                      <li>Draw neat diagrams where required</li>
                      <li>Label all test tubes and solutions clearly</li>
                    </ul>
                  </div>
                  
                  <div className="bg-red-100 p-3 rounded">
                    <h4 className="font-semibold mb-2 text-red-800">⚠️ Safety Precautions:</h4>
                    <ul className="list-disc list-inside space-y-1">
                      <li>Wear safety goggles and lab coat</li>
                      <li>Handle concentrated acids and bases carefully</li>
                      <li>Use fume hood for experiments involving toxic gases</li>
                      <li>Never taste or smell chemicals directly</li>
                      <li>Dispose of chemicals properly in designated containers</li>
                      <li>Report any accidents immediately to supervisor</li>
                      <li>Wash hands thoroughly after experiments</li>
                    </ul>
                  </div>
                </div>
              </div>
              
              <div className="bg-yellow-50 p-4 rounded-lg">
                <h3 className="text-lg font-bold text-yellow-800 mb-2">🧠 Memory Aids for Practicals</h3>
                <div className="space-y-3 text-sm">
                  <div className="bg-yellow-100 p-3 rounded">
                    <p className="font-semibold text-yellow-800">Cation Groups (Silver Leads Aluminum Iron Zinc):</p>
                    <p className="text-gray-700"><strong>Group I:</strong> Ag<sup><strong>+</strong></sup> (white ppt with HCl)<br/><strong>Group II:</strong> Pb<sup><strong>2+</strong></sup>, Cu<sup><strong>2+</strong></sup> (H<sub><strong>2</strong></sub>S in acidic)<br/><strong>Group III:</strong> Al<sup><strong>3+</strong></sup>, Fe<sup><strong>3+</strong></sup> (NH<sub><strong>4</strong></sub>OH + NH<sub><strong>4</strong></sub>Cl)<br/><strong>Group IV:</strong> Zn<sup><strong>2+</strong></sup>, Mn<sup><strong>2+</strong></sup> (H<sub><strong>2</strong></sub>S in basic)</p>
                  </div>
                  <div className="bg-yellow-100 p-3 rounded">
                    <p className="font-semibold text-yellow-800">Flame Test Colors:</p>
                    <p className="text-gray-700"><strong>"Lily's Sodium Potassium Calcium Barium"</strong><br/>Li<sup><strong>+</strong></sup> = Red, Na<sup><strong>+</strong></sup> = Yellow, K<sup><strong>+</strong></sup> = Violet, Ca<sup><strong>2+</strong></sup> = Brick red, Ba<sup><strong>2+</strong></sup> = Green</p>
                  </div>
                  <div className="bg-yellow-100 p-3 rounded">
                    <p className="font-semibold text-yellow-800">Titration Indicators:</p>
                    <p className="text-gray-700"><strong>"Phenol Methyl"</strong> - Phenolphthalein (weak acid vs strong base), Methyl orange (strong acid vs weak base)</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 border-b-2 border-blue-200 pb-2">7. Common Practical Mistakes to Avoid</h2>
            <div className="bg-red-50 p-4 rounded-lg">
              <div className="space-y-3 text-sm">
                <div className="bg-red-100 p-3 rounded">
                  <h4 className="font-semibold mb-2 text-red-800">Salt Analysis Errors:</h4>
                  <ul className="list-disc list-inside space-y-1">
                    <li>Not washing precipitates properly</li>
                    <li>Using wrong reagent concentrations</li>
                    <li>Mixing up confirmatory tests</li>
                    <li>Not heating solutions when required</li>
                    <li>Ignoring color changes in flame tests</li>
                  </ul>
                </div>
                <div className="bg-red-100 p-3 rounded">
                  <h4 className="font-semibold mb-2 text-red-800">Titration Errors:</h4>
                  <ul className="list-disc list-inside space-y-1">
                    <li>Air bubbles in burette</li>
                    <li>Wrong indicator selection</li>
                    <li>Parallax error in reading</li>
                    <li>Not swirling the conical flask</li>
                    <li>Adding indicator after titration starts</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}