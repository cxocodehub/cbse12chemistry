'use client'

import { useRef, useEffect, useState } from 'react'
import jsPDF from 'jspdf'
import html2canvas from 'html2canvas'

declare global {
  interface Window {
    MathJax: any;
  }
}

export default function Home() {
  const notesRef = useRef<HTMLDivElement>(null)
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
    const timer = setTimeout(() => {
      if (window.MathJax && window.MathJax.typeset) {
        window.MathJax.typeset()
      }
    }, 100)
    return () => clearTimeout(timer)
  }, [])

  if (!isClient) {
    return <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-xl">Loading...</div>
    </div>
  }

  const downloadPDF = async () => {
    if (!notesRef.current) return
    
    // Wait for MathJax to render before capturing
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    const canvas = await html2canvas(notesRef.current, { 
      scale: 2,
      useCORS: true,
      allowTaint: true,
      backgroundColor: '#ffffff',
      logging: false,
      removeContainer: true
    })
    
    const imgData = canvas.toDataURL('image/png', 1.0)
    const pdf = new jsPDF('p', 'mm', 'a4')
    
    const pdfWidth = pdf.internal.pageSize.getWidth()
    const pdfHeight = pdf.internal.pageSize.getHeight() - 20 // Leave margin for page numbers
    const imgWidth = pdfWidth - 10 // Add margins
    const imgHeight = (canvas.height * imgWidth) / canvas.width
    
    const totalPages = Math.ceil(imgHeight / pdfHeight)
    
    for (let i = 0; i < totalPages; i++) {
      if (i > 0) pdf.addPage()
      
      const yPosition = -(i * pdfHeight)
      pdf.addImage(imgData, 'PNG', 5, yPosition, imgWidth, imgHeight)
      
      // Add page number
      pdf.setFontSize(10)
      pdf.setTextColor(100)
      pdf.text(`Page ${i + 1} of ${totalPages}`, pdfWidth - 30, pdfHeight + 15)
    }
    
    pdf.save('CBSE-Class12-Chemistry-Unit1-Solutions.pdf')
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="flex justify-end mb-4">
          <div className="flex space-x-2">
            <a href="/" className="w-8 h-8 bg-yellow-500 text-white rounded-full flex items-center justify-center text-sm">1</a>
            <a href="/unit2" className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm hover:bg-blue-700">2</a>
            <a href="/unit3" className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm hover:bg-blue-700">3</a>
            <a href="/unit4" className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm hover:bg-blue-700">4</a>
            <a href="/unit5" className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm hover:bg-blue-700">5</a>
            <a href="/unit6" className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm hover:bg-blue-700">6</a>
            <a href="/unit7" className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm hover:bg-blue-700">7</a>
            <a href="/unit8" className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm hover:bg-blue-700">8</a>
            <a href="/unit9" className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm hover:bg-blue-700">9</a>
            <a href="/unit10" className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm hover:bg-blue-700">10</a>
            <a href="/practical" className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm hover:bg-blue-700">P</a>
          </div>
        </div>
        <div ref={notesRef} className="bg-white p-8 rounded-lg shadow-lg">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-blue-800">CBSE Class 12 Chemistry</h1>
            <h2 className="text-xl font-semibold text-gray-700 mt-2">Unit 1: Solutions - Complete Notes</h2>
          </div>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 border-b-2 border-blue-200 pb-2">1. Types of Solutions</h2>
            <div className="bg-blue-50 p-4 rounded-lg mb-4">
              <div className="text-center mb-4">
                <img src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDQwMCAyMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI0MDAiIGhlaWdodD0iMjAwIiBmaWxsPSIjRjNGNEY2Ii8+Cjx0ZXh0IHg9IjIwMCIgeT0iNTAiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxOCIgZm9udC13ZWlnaHQ9ImJvbGQiIGZpbGw9IiMxRTQwQUYiIHRleHQtYW5jaG9yPSJtaWRkbGUiPlR5cGVzIG9mIFNvbHV0aW9uczwvdGV4dD4KPHN2ZyB4PSI1MCIgeT0iODAiIHdpZHRoPSIxMDAiIGhlaWdodD0iMTAwIj4KICA8Y2lyY2xlIGN4PSI1MCIgY3k9IjUwIiByPSI0MCIgZmlsbD0iIzM0RDM5OSIgb3BhY2l0eT0iMC43Ii8+CiAgPHRleHQgeD0iNTAiIHk9IjU1IiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMTIiIGZpbGw9IndoaXRlIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIj5Tb2xpZDwvdGV4dD4KPC9zdmc+CjxzdmcgeD0iMTUwIiB5PSI4MCIgd2lkdGg9IjEwMCIgaGVpZ2h0PSIxMDAiPgogIDxjaXJjbGUgY3g9IjUwIiBjeT0iNTAiIHI9IjQwIiBmaWxsPSIjNjM2NkYxIiBvcGFjaXR5PSIwLjciLz4KICA8dGV4dCB4PSI1MCIgeT0iNTUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxMiIgZmlsbD0id2hpdGUiIHRleHQtYW5jaG9yPSJtaWRkbGUiPkxpcXVpZDwvdGV4dD4KPC9zdmc+CjxzdmcgeD0iMjUwIiB5PSI4MCIgd2lkdGg9IjEwMCIgaGVpZ2h0PSIxMDAiPgogIDxjaXJjbGUgY3g9IjUwIiBjeT0iNTAiIHI9IjQwIiBmaWxsPSIjRkY3MDQzIiBvcGFjaXR5PSIwLjciLz4KICA8dGV4dCB4PSI1MCIgeT0iNTUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxMiIgZmlsbD0id2hpdGUiIHRleHQtYW5jaG9yPSJtaWRkbGUiPkdhczwvdGV4dD4KPC9zdmc+Cjwvc3ZnPg==" alt="Types of Solutions" className="mx-auto rounded-lg shadow-md" />
              </div>
            </div>
            <div className="grid md:grid-cols-2 gap-4 text-sm">
              <div className="bg-gray-50 p-4 rounded">
                <h3 className="font-semibold mb-2">Based on Physical State:</h3>
                <ul className="list-disc list-inside space-y-1">
                  <li><strong>Solid in Solid:</strong> Alloys (brass, bronze, steel)</li>
                  <li><strong>Solid in Liquid:</strong> Sugar in water, salt in water</li>
                  <li><strong>Liquid in Liquid:</strong> Alcohol in water, benzene in toluene</li>
                  <li><strong>Gas in Liquid:</strong> CO<sub><strong>2</strong></sub> in water (soda), O<sub><strong>2</strong></sub> in water</li>
                  <li><strong>Gas in Gas:</strong> Air (mixture of gases)</li>
                </ul>
              </div>
              <div className="bg-gray-50 p-4 rounded">
                <h3 className="font-semibold mb-2">Based on Concentration:</h3>
                <ul className="list-disc list-inside space-y-1">
                  <li><strong>Dilute Solution:</strong> Small amount of solute</li>
                  <li><strong>Concentrated Solution:</strong> Large amount of solute</li>
                  <li><strong>Saturated Solution:</strong> Maximum solute at given temperature</li>
                  <li><strong>Supersaturated Solution:</strong> More than maximum solute (unstable)</li>
                  <li><strong>Unsaturated Solution:</strong> Less than maximum solute</li>
                </ul>
              </div>
            </div>
            <div className="bg-yellow-50 p-4 rounded-lg mt-4">
              <h3 className="text-lg font-bold text-yellow-800 mb-2">💡 Study Tips</h3>
              <ul className="text-sm text-gray-700 space-y-1">
                <li>• Remember: Solute dissolves in solvent to form solution</li>
                <li>• Alloys are solid solutions - very important for board exams</li>
                <li>• Supersaturated solutions are unstable and crystallize easily</li>
                <li>• Practice identifying solute and solvent in different examples</li>
              </ul>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 border-b-2 border-blue-200 pb-2">2. Expression of Concentration</h2>
            <div className="space-y-4">
              <div className="bg-blue-50 p-4 rounded-lg">
                <h3 className="text-lg font-bold text-blue-800 mb-2">Mass Percentage (w/w)</h3>
                <div className="text-lg font-bold mb-2" dangerouslySetInnerHTML={{__html: "$$\\text{Mass %} = \\frac{\\text{mass of solute}}{\\text{mass of solution}} \\times 100$$"}} />
                <div className="bg-blue-100 p-3 rounded mt-2">
                  <p className="text-sm font-semibold text-blue-800 mb-1">Example 1:</p>
                  <p className="text-sm text-gray-700">A solution is prepared by mixing 46g ethanol (C₂H₅OH) and 54g water. If the density of solution is 0.96 g/mL, find mass % and molarity of ethanol.</p>
                  <p className="text-sm text-gray-900 font-semibold"><strong>Solution:</strong> Mass % = (46/100) × 100 = 46%<br/>Moles of ethanol = 46/46 = 1 mol; Volume = 100/0.96 = 104.17 mL<br/>Molarity = 1/(104.17/1000) = 9.6 M</p>
                </div>
                <div className="bg-blue-100 p-3 rounded mt-2">
                  <p className="text-sm font-semibold text-blue-800 mb-1">Example 2:</p>
                  <p className="text-sm text-gray-700">A 15% by mass NaOH solution has density 1.162 g/mL. Calculate molarity of NaOH.</p>
                  <p className="text-sm text-gray-900 font-semibold"><strong>Solution:</strong> In 100g solution: 15g NaOH<br/>Moles NaOH = 15/40 = 0.375 mol<br/>Volume = 100/1.162 = 86.07 mL<br/>Molarity = 0.375/(86.07/1000) = 4.36 M</p>
                </div>
              </div>
              
              <div className="bg-green-50 p-4 rounded-lg">
                <h3 className="text-lg font-bold text-green-800 mb-2">Volume Percentage (v/v)</h3>
                <div className="text-lg font-bold mb-2" dangerouslySetInnerHTML={{__html: "$$\\text{Volume %} = \\frac{\\text{volume of solute}}{\\text{volume of solution}} \\times 100$$"}} />
                <div className="bg-green-100 p-3 rounded mt-2">
                  <p className="text-sm font-semibold text-green-800 mb-1">Example 1:</p>
                  <p className="text-sm text-gray-700">25mL of 0.2M HCl is mixed with 75mL of 0.1M HCl. Calculate the volume % of first solution and final molarity.</p>
                  <p className="text-sm text-gray-900 font-semibold"><strong>Solution:</strong> Volume % = (25/100) × 100 = 25%<br/>Total moles = (0.2 × 0.025) + (0.1 × 0.075) = 0.005 + 0.0075 = 0.0125 mol<br/>Final Molarity = 0.0125/0.1 = 0.125 M</p>
                </div>
                <div className="bg-green-100 p-3 rounded mt-2">
                  <p className="text-sm font-semibold text-green-800 mb-1">Example 2:</p>
                  <p className="text-sm text-gray-700">40mL pure acetone mixed with 60mL water gives 98mL solution. Calculate volume % of acetone.</p>
                  <p className="text-sm text-gray-900 font-semibold"><strong>Solution:</strong> Volume % = (40/98) × 100 = 40.8%<br/>Volume contraction = 2mL shows non-ideal mixing</p>
                </div>
              </div>
              
              <div className="bg-red-50 p-4 rounded-lg">
                <h3 className="text-lg font-bold text-red-800 mb-2">Mole Fraction (χ)</h3>
                <div className="text-lg font-bold mb-2" dangerouslySetInnerHTML={{__html: "$$\\chi_A = \\frac{n_A}{n_A + n_B}$$"}} />
                <div className="bg-red-100 p-3 rounded mt-2">
                  <p className="text-sm font-semibold text-red-800 mb-1">Example 1:</p>
                  <p className="text-sm text-gray-700">A solution contains 92g ethanol (C₂H₅OH) and 90g water (H₂O). Calculate mole fractions and verify that they sum to 1. Also find molality.</p>
                  <p className="text-sm text-gray-900 font-semibold"><strong>Solution:</strong> n<sub><strong>ethanol</strong></sub> = 92/46 = 2 mol, n<sub><strong>water</strong></sub> = 90/18 = 5 mol<br/>χ<sub><strong>ethanol</strong></sub> = 2/7 = 0.286, χ<sub><strong>water</strong></sub> = 5/7 = 0.714<br/>Sum = 0.286 + 0.714 = 1.0 ✓<br/>Molality = 2/(90/1000) = 22.22 m</p>
                </div>
                <div className="bg-red-100 p-3 rounded mt-2">
                  <p className="text-sm font-semibold text-red-800 mb-1">Example 2:</p>
                  <p className="text-sm text-gray-700">36g glucose, 18g urea, 54g water. Calculate mole fraction of each.</p>
                  <p className="text-sm text-gray-900 font-semibold"><strong>Solution:</strong> n<sub><strong>glucose</strong></sub> = 0.2, n<sub><strong>urea</strong></sub> = 0.3, n<sub><strong>water</strong></sub> = 3 mol<br/>χ<sub><strong>glucose</strong></sub> = 0.057, χ<sub><strong>urea</strong></sub> = 0.086, χ<sub><strong>water</strong></sub> = 0.857</p>
                </div>
              </div>
              
              <div className="bg-indigo-50 p-4 rounded-lg">
                <h3 className="text-lg font-bold text-indigo-800 mb-2">Molarity (M) - Temperature Dependent</h3>
                <div className="text-lg font-bold mb-2" dangerouslySetInnerHTML={{__html: "$$M = \\frac{\\text{moles of solute}}{\\text{volume of solution (L)}}$$"}} />
                <div className="bg-indigo-100 p-3 rounded mt-2">
                  <p className="text-sm font-semibold text-indigo-800 mb-1">Example 1:</p>
                  <p className="text-sm text-gray-700">What volume of 0.5M H₂SO₄ should be mixed with 200mL of 0.2M H₂SO₄ to get 0.3M solution?</p>
                  <p className="text-sm text-gray-900 font-semibold"><strong>Solution:</strong> Let V mL of 0.5M be added<br/>Total moles = 0.5V/1000 + 0.2 × 0.2 = 0.0005V + 0.04<br/>Total volume = (V + 200)/1000 L<br/>0.3 = (0.0005V + 0.04)/((V + 200)/1000)<br/>Solving: V = 100 mL</p>
                </div>
                <div className="bg-indigo-100 p-3 rounded mt-2">
                  <p className="text-sm font-semibold text-indigo-800 mb-1">Example 2:</p>
                  <p className="text-sm text-gray-700">How many mL of 0.5M NaCl diluted to 250mL gives 0.1M?</p>
                  <p className="text-sm text-gray-900 font-semibold"><strong>Solution:</strong> M₁V₁ = M₂V₂<br/>0.5 × V₁ = 0.1 × 250<br/>V₁ = 50 mL</p>
                </div>
              </div>
              
              <div className="bg-teal-50 p-4 rounded-lg">
                <h3 className="text-lg font-bold text-teal-800 mb-2">Molality (m) - Temperature Independent</h3>
                <div className="text-lg font-bold mb-2" dangerouslySetInnerHTML={{__html: "$$m = \\frac{\\text{moles of solute}}{\\text{mass of solvent (kg)}}$$"}} />
                <div className="bg-teal-100 p-3 rounded mt-2">
                  <p className="text-sm font-semibold text-teal-800 mb-1">Example 1:</p>
                  <p className="text-sm text-gray-700">Calculate molality when 25% by mass H₂SO₄ solution (density = 1.18 g/mL) is diluted. Also find molarity of original solution.</p>
                  <p className="text-sm text-gray-900 font-semibold"><strong>Solution:</strong> In 100g solution: 25g H₂SO₄, 75g water<br/>Moles H₂SO₄ = 25/98 = 0.255 mol<br/>Molality = 0.255/(75/1000) = 3.4 m<br/>Volume = 100/1.18 = 84.75 mL<br/>Molarity = 0.255/(84.75/1000) = 3.01 M</p>
                </div>
                <div className="bg-teal-100 p-3 rounded mt-2">
                  <p className="text-sm font-semibold text-teal-800 mb-1">Example 2:</p>
                  <p className="text-sm text-gray-700">Calculate molality of 10% KOH solution. Find mole fraction of KOH.</p>
                  <p className="text-sm text-gray-900 font-semibold"><strong>Solution:</strong> In 100g: 10g KOH, 90g water<br/>Molality = (10/56)/(90/1000) = 1.99 m<br/>χ<sub>KOH</sub> = 0.179/5.179 = 0.035</p>
                </div>
              </div>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 border-b-2 border-blue-200 pb-2">3. Solubility of Gases in Liquids</h2>
            <div className="bg-yellow-50 p-4 rounded-lg mb-4">
              <h3 className="font-semibold text-lg mb-2">Henry's Law</h3>
              <div className="text-lg font-bold mb-2" dangerouslySetInnerHTML={{__html: "$$p = K_H \\times \\chi$$"}} />
              <p className="text-sm">Where p = partial pressure, K<sub><strong>H</strong></sub> = Henry's constant, χ = mole fraction</p>
              <div className="bg-yellow-100 p-3 rounded mt-3">
                <p className="text-sm font-semibold text-yellow-800 mb-1">Example 1:</p>
                <p className="text-sm text-gray-700">At 298K, K<sub><strong>H</strong></sub> for N₂ in water is 7.6 × 10⁹ Pa. Air contains 78% N₂ by volume at 1 atm pressure. Find molality of N₂ in water when air is bubbled through water.</p>
                <p className="text-sm text-gray-900 font-semibold"><strong>Solution:</strong><br/>Step 1: p<sub><strong>N₂</strong></sub> = 0.78 × 101325 = 79034 Pa<br/>Step 2: χ<sub><strong>N₂</strong></sub> = p/K<sub><strong>H</strong></sub> = 79034/(7.6 × 10⁹) = 1.04 × 10⁻⁶<br/>Step 3: For dilute solution: n<sub><strong>N₂</strong></sub>/n<sub><strong>H₂O</strong></sub> = 1.04 × 10⁻⁶<br/>Step 4: Molality = (1.04 × 10⁻⁶ × 1000)/18 = 5.78 × 10⁻⁵ m</p>
              </div>
              <div className="bg-yellow-100 p-3 rounded mt-3">
                <p className="text-sm font-semibold text-yellow-800 mb-1">Example 2:</p>
                <p className="text-sm text-gray-700">K<sub>H</sub> for O₂ is 4.6 × 10⁹ Pa at 298K. Calculate O₂ solubility when air (21% O₂) at 1 atm contacts water.</p>
                <p className="text-sm text-green-700"><strong>Solution:</strong> p<sub>O₂</sub> = 0.21 × 101325 = 21278 Pa<br/>χ<sub>O₂</sub> = 21278/(4.6 × 10⁹) = 4.63 × 10⁻⁶<br/>Molality = (4.63 × 10⁻⁶ × 1000)/18 = 2.57 × 10⁻⁴ m</p>
              </div>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 border-b-2 border-blue-200 pb-2">4. Raoult's Law</h2>
            <div className="space-y-4">
              <div className="bg-purple-50 p-4 rounded-lg">
                <h3 className="font-semibold text-purple-700 mb-2">For Volatile Components:</h3>
                <div className="text-lg font-bold" dangerouslySetInnerHTML={{__html: "$$p_{total} = p_A^0 \\times \\chi_A + p_B^0 \\times \\chi_B$$"}} />
              </div>
              <div className="bg-purple-50 p-4 rounded-lg">
                <h3 className="font-semibold text-purple-700 mb-2">For Non-volatile Solute:</h3>
                <div className="text-lg font-bold" dangerouslySetInnerHTML={{__html: "$$p_{solution} = p_{solvent}^0 \\times \\chi_{solvent}$$"}} />
              </div>
              <div className="bg-purple-100 p-3 rounded mt-3">
                <p className="text-sm font-semibold text-purple-800 mb-1">Example 1:</p>
                <p className="text-sm text-gray-700">At 313K, vapor pressures of pure ethanol and methanol are 13.44 kPa and 16.94 kPa respectively. A solution contains 25g ethanol and 25g methanol. Calculate total vapor pressure and mole fraction of ethanol in vapor phase.</p>
                <p className="text-sm text-green-700"><strong>Solution:</strong> n<sub>ethanol</sub> = 25/46 = 0.543 mol, n<sub>methanol</sub> = 25/32 = 0.781 mol<br/>χ<sub>ethanol</sub> = 0.543/1.324 = 0.41, χ<sub>methanol</sub> = 0.59<br/>p<sub>total</sub> = 13.44 × 0.41 + 16.94 × 0.59 = 5.51 + 9.99 = 15.5 kPa<br/>y<sub>ethanol</sub> = 5.51/15.5 = 0.355</p>
              </div>
              <div className="bg-purple-100 p-3 rounded mt-3">
                <p className="text-sm font-semibold text-purple-800 mb-1">Example 2:</p>
                <p className="text-sm text-gray-700">Benzene and toluene vapor pressures at 300K are 103.01 and 32.06 kPa. Solution has 0.5 mol each. Find total pressure.</p>
                <p className="text-sm text-green-700"><strong>Solution:</strong> χ<sub>benzene</sub> = χ<sub>toluene</sub> = 0.5<br/>p<sub>total</sub> = 103.01 × 0.5 + 32.06 × 0.5 = 67.53 kPa</p>
              </div>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 border-b-2 border-blue-200 pb-2">5. Colligative Properties</h2>
            <p className="text-sm mb-4 italic">Properties depending only on number of solute particles, not their nature.</p>
            
            <h3 className="text-xl font-semibold mb-3 text-blue-700">Relative Lowering of Vapor Pressure</h3>
            <div className="bg-gray-50 p-4 rounded-lg mb-4">
              <div className="text-xl font-bold mb-3" dangerouslySetInnerHTML={{__html: "$$\\frac{p_1^0 - p_1}{p_1^0} = \\chi_2$$"}} />
              <div className="text-lg font-bold mb-2" dangerouslySetInnerHTML={{__html: "For dilute solutions: $$\\frac{p_1^0 - p_1}{p_1^0} = \\frac{n_2}{n_1}$$"}} />
              <div className="bg-gray-100 p-3 rounded mt-3">
                <p className="text-sm font-semibold text-gray-800 mb-1">Example 1:</p>
                <p className="text-sm text-gray-700">18g glucose is dissolved in 178.2g water. At 373K, vapor pressure of pure water is 101.325 kPa. Calculate: (a) Vapor pressure of solution (b) Relative lowering of vapor pressure</p>
                <p className="text-sm text-green-700"><strong>Solution:</strong> n<sub>glucose</sub> = 18/180 = 0.1 mol, n<sub>water</sub> = 178.2/18 = 9.9 mol<br/>χ<sub>glucose</sub> = 0.1/10 = 0.01, χ<sub>water</sub> = 0.99<br/>(a) p<sub>solution</sub> = 101.325 × 0.99 = 100.31 kPa<br/>(b) Relative lowering = 0.01 = 1%</p>
              </div>
              <div className="bg-gray-100 p-3 rounded mt-3">
                <p className="text-sm font-semibold text-gray-800 mb-1">Example 2:</p>
                <p className="text-sm text-gray-700">12g urea in 108g water. Calculate relative lowering if p° = 2.84 kPa.</p>
                <p className="text-sm text-green-700"><strong>Solution:</strong> n<sub>urea</sub> = 0.2 mol, n<sub>water</sub> = 6 mol<br/>χ<sub>urea</sub> = 0.2/6.2 = 0.032<br/>p<sub>solution</sub> = 2.84 × 0.968 = 2.75 kPa</p>
              </div>
            </div>
            
            <h3 className="text-xl font-semibold mb-3 text-blue-700">Elevation of Boiling Point</h3>
            <div className="bg-gray-50 p-4 rounded-lg mb-4">
              <div className="text-xl font-bold mb-3" dangerouslySetInnerHTML={{__html: "$$\\Delta T_b = K_b \\times m$$"}} />
              <p className="text-sm text-gray-700"><strong>K<sub>b</sub> values:</strong> Water = 0.512 K·kg/mol</p>
              <div className="bg-gray-100 p-3 rounded mt-3">
                <p className="text-sm font-semibold text-gray-800 mb-1">Example 1:</p>
                <p className="text-sm text-gray-700">A solution of 6.8g sucrose (C₁₂H₂₂O₁₁) and 1.2g urea (NH₂CONH₂) in 100g water. Calculate boiling point of solution. K<sub>b</sub> = 0.512 K·kg/mol</p>
                <p className="text-sm text-green-700"><strong>Solution:</strong> n<sub>sucrose</sub> = 6.8/342 = 0.0199 mol<br/>n<sub>urea</sub> = 1.2/60 = 0.02 mol<br/>Total moles = 0.0199 + 0.02 = 0.0399 mol<br/>m<sub>total</sub> = 0.0399/0.1 = 0.399 m<br/>ΔT<sub>b</sub> = 0.512 × 0.399 = 0.204°C<br/>Boiling point = 100 + 0.204 = 100.204°C</p>
              </div>
              <div className="bg-gray-100 p-3 rounded mt-3">
                <p className="text-sm font-semibold text-gray-800 mb-1">Example 2:</p>
                <p className="text-sm text-gray-700">2.5g solute in 100g water boils at 100.15°C. Calculate molar mass.</p>
                <p className="text-sm text-green-700"><strong>Solution:</strong> ΔT<sub>b</sub> = 0.15°C<br/>m = 0.15/0.512 = 0.293 m<br/>Molar mass = 2.5/(0.0293) = 85.3 g/mol</p>
              </div>
            </div>
            
            <h3 className="text-xl font-semibold mb-3 text-blue-700">Depression of Freezing Point</h3>
            <div className="bg-gray-50 p-4 rounded-lg mb-4">
              <div className="text-xl font-bold mb-3" dangerouslySetInnerHTML={{__html: "$$\\Delta T_f = K_f \\times m$$"}} />
              <p className="text-sm text-gray-700"><strong>K<sub>f</sub> values:</strong> Water = 1.86 K·kg/mol</p>
              <div className="bg-gray-100 p-3 rounded mt-3">
                <p className="text-sm font-semibold text-gray-800 mb-1">Example 1:</p>
                <p className="text-sm text-gray-700">Calculate the freezing point of solution when 1.85g of dissolved substance having molecular formula C₂H₆O in 100g of water produces a depression of 0.186°C. Verify if the substance exists as monomer or dimer in solution.</p>
                <p className="text-sm text-green-700"><strong>Solution:</strong> ΔT<sub>f</sub> = 0.186°C, K<sub>f</sub> = 1.86 K·kg/mol<br/>m = ΔT<sub>f</sub>/K<sub>f</sub> = 0.186/1.86 = 0.1 m<br/>Moles = 0.1 × 0.1 = 0.01 mol<br/>Observed molar mass = 1.85/0.01 = 185 g/mol<br/>Theoretical molar mass of C₂H₆O = 46 g/mol<br/>Since 185 ≈ 4 × 46, substance exists as tetramer</p>
              </div>
              <div className="bg-gray-100 p-3 rounded mt-3">
                <p className="text-sm font-semibold text-gray-800 mb-1">Example 2:</p>
                <p className="text-sm text-gray-700">1.8g glucose in 90g water freezes at -0.372°C. Verify calculation.</p>
                <p className="text-sm text-green-700"><strong>Solution:</strong> ΔT<sub>f</sub> = 0.372°C<br/>Expected: m = 0.01/0.09 = 0.111 m<br/>ΔT<sub>f</sub> = 1.86 × 0.111 = 0.206°C ≠ 0.372°C</p>
              </div>
            </div>
            
            <h3 className="text-xl font-semibold mb-3 text-blue-700">Osmotic Pressure</h3>
            <div className="bg-gray-50 p-4 rounded-lg mb-4">
              <div className="text-xl font-bold mb-3" dangerouslySetInnerHTML={{__html: "$$\\Pi = CRT = \\frac{n}{V}RT$$"}} />
              <p className="text-sm text-blue-700"><strong>Best method for macromolecules</strong></p>
              <div className="bg-gray-100 p-3 rounded mt-3">
                <p className="text-sm font-semibold text-gray-800 mb-1">Example 1:</p>
                <p className="text-sm text-gray-700">Two solutions A and B are separated by a semipermeable membrane. Solution A contains 1.17g NaCl in 100mL and solution B contains 3.42g sucrose in 100mL. At 300K, find the direction of osmosis and net osmotic pressure.</p>
                <p className="text-sm text-green-700"><strong>Solution:</strong> For NaCl: M = (1.17/58.5)/0.1 = 0.2 M, i = 2<br/>Π<sub>A</sub> = 2 × 0.2 × 0.0821 × 300 = 9.85 atm<br/>For sucrose: M = (3.42/342)/0.1 = 0.1 M, i = 1<br/>Π<sub>B</sub> = 1 × 0.1 × 0.0821 × 300 = 2.46 atm<br/>Net Π = 9.85 - 2.46 = 7.39 atm (A → B)</p>
              </div>
              <div className="bg-gray-100 p-3 rounded mt-3">
                <p className="text-sm font-semibold text-gray-800 mb-1">Example 2:</p>
                <p className="text-sm text-gray-700">0.05M Ba(NO₃)₂ at 300K with 60% dissociation. Calculate osmotic pressure.</p>
                <p className="text-sm text-green-700"><strong>Solution:</strong> Ba(NO₃)₂ → Ba²⁺ + 2NO₃⁻ (n = 3)<br/>i = 1 + 0.6(3-1) = 2.2<br/>Π = 2.2 × 0.05 × 0.0821 × 300 = 2.71 atm</p>
              </div>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 border-b-2 border-blue-200 pb-2">6. Determination of Molecular Masses</h2>
            <div className="space-y-4">
              <div className="bg-blue-50 p-4 rounded-lg">
                <h3 className="text-lg font-bold text-blue-800 mb-3">From Elevation of Boiling Point:</h3>
                <div className="text-lg font-bold mb-2" dangerouslySetInnerHTML={{__html: "$$M = \\frac{K_b \\times w_2 \\times 1000}{\\Delta T_b \\times w_1}$$"}} />
                <div className="bg-blue-100 p-3 rounded mt-2">
                  <p className="text-sm font-semibold text-blue-800 mb-1">Example 1:</p>
                  <p className="text-sm text-gray-700">When 2.56g of sulfur is dissolved in 100g of CS₂, the boiling point rises by 0.81°C. K<sub>b</sub> for CS₂ = 2.42 K·kg/mol. Find molecular formula of sulfur in CS₂ solution.</p>
                  <p className="text-sm text-green-700"><strong>Solution:</strong> M = (2.42 × 2.56 × 1000)/(0.81 × 100) = 76.4 g/mol<br/>Atomic mass of S = 32 g/mol<br/>Number of S atoms = 76.4/32 ≈ 2.4 ≈ 2<br/>But considering experimental error and association: S₈ (octasulfur)<br/>Theoretical mass of S₈ = 8 × 32 = 256 g/mol<br/>Observed suggests partial dissociation to smaller units</p>
                </div>
                <div className="bg-blue-100 p-3 rounded mt-2">
                  <p className="text-sm font-semibold text-blue-800 mb-1">Example 2:</p>
                  <p className="text-sm text-gray-700">3.2g naphthalene in 40g CCl₄ raises boiling point by 0.6°C. Calculate K<sub>b</sub> for CCl₄.</p>
                  <p className="text-sm text-green-700"><strong>Solution:</strong> m = (3.2/128)/(40/1000) = 0.625 m<br/>K<sub>b</sub> = 0.6/0.625 = 0.96 K·kg/mol</p>
                </div>
              </div>
              
              <div className="bg-green-50 p-4 rounded-lg">
                <h3 className="text-lg font-bold text-green-800 mb-3">From Depression of Freezing Point:</h3>
                <div className="text-lg font-bold mb-2" dangerouslySetInnerHTML={{__html: "$$M = \\frac{K_f \\times w_2 \\times 1000}{\\Delta T_f \\times w_1}$$"}} />
                <div className="bg-green-100 p-3 rounded mt-2">
                  <p className="text-sm font-semibold text-green-800 mb-1">Example 1:</p>
                  <p className="text-sm text-gray-700">A 0.561g sample of KCl is dissolved in 100g water. The freezing point is found to be -0.234°C. Calculate the degree of dissociation of KCl. K<sub>f</sub> = 1.86 K·kg/mol</p>
                  <p className="text-sm text-green-700"><strong>Solution:</strong> Theoretical m = (0.561/74.5)/0.1 = 0.0753 m<br/>Observed ΔT<sub>f</sub> = 0.234°C<br/>Observed m = 0.234/1.86 = 0.1258 m<br/>i = 0.1258/0.0753 = 1.67<br/>For KCl: i = 1 + α(2-1) = 1 + α<br/>α = 1.67 - 1 = 0.67 = 67%</p>
                </div>
                <div className="bg-green-100 p-3 rounded mt-2">
                  <p className="text-sm font-semibold text-green-800 mb-1">Example 2:</p>
                  <p className="text-sm text-gray-700">2g unknown substance in 50g water freezes at -1.86°C. Calculate molar mass.</p>
                  <p className="text-sm text-green-700"><strong>Solution:</strong> ΔT<sub>f</sub> = 1.86°C<br/>m = 1.86/1.86 = 1.0 m<br/>Molar mass = 2/(0.05) = 40 g/mol</p>
                </div>
              </div>
              
              <div className="bg-purple-50 p-4 rounded-lg">
                <h3 className="text-lg font-bold text-purple-800 mb-3">From Osmotic Pressure:</h3>
                <div className="text-lg font-bold mb-2" dangerouslySetInnerHTML={{__html: "$$M = \\frac{w_2RT}{\\Pi V}$$"}} />
                <p className="text-sm text-gray-700"><strong>Most accurate for macromolecules</strong></p>
                <div className="bg-purple-100 p-3 rounded mt-2">
                  <p className="text-sm font-semibold text-purple-800 mb-1">Example 1:</p>
                  <p className="text-sm text-gray-700">A polymer solution containing 0.8g polymer in 300mL solution shows osmotic pressure of 2.46 × 10⁻³ atm at 300K. Calculate molar mass and number average degree of polymerization if monomer mass is 104 g/mol.</p>
                  <p className="text-sm text-green-700"><strong>Solution:</strong> Π = 2.46 × 10⁻³ atm, V = 0.3 L<br/>C = Π/RT = (2.46 × 10⁻³)/(0.0821 × 300) = 1 × 10⁻⁴ M<br/>Moles = 1 × 10⁻⁴ × 0.3 = 3 × 10⁻⁵ mol<br/>M = 0.8/(3 × 10⁻⁵) = 26,667 g/mol<br/>Degree of polymerization = 26,667/104 = 256</p>
                </div>
                <div className="bg-purple-100 p-3 rounded mt-2">
                  <p className="text-sm font-semibold text-purple-800 mb-1">Example 2:</p>
                  <p className="text-sm text-gray-700">Protein solution: 0.6g in 100mL shows Π = 0.0021 atm at 298K. Find molar mass.</p>
                  <p className="text-sm text-green-700"><strong>Solution:</strong> C = 0.0021/(0.0821 × 298) = 8.58 × 10⁻⁵ M<br/>Molar mass = 0.6/(8.58 × 10⁻⁶) = 69,930 g/mol</p>
                </div>
              </div>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 border-b-2 border-blue-200 pb-2">7. Van't Hoff Factor</h2>
            <div className="bg-orange-50 p-4 rounded-lg mb-4">
              <h3 className="text-lg font-bold text-orange-800 mb-3">Van't Hoff Factor (i):</h3>
              <div className="text-lg font-bold mb-2" dangerouslySetInnerHTML={{__html: "$$i = \\frac{\\text{Observed colligative property}}{\\text{Calculated colligative property}}$$"}} />
              <div className="space-y-3 mt-4">
                <div className="text-base font-bold" dangerouslySetInnerHTML={{__html: "$$\\Delta T_b = i \\times K_b \\times m$$"}} />
                <div className="text-base font-bold" dangerouslySetInnerHTML={{__html: "$$\\Delta T_f = i \\times K_f \\times m$$"}} />
                <div className="text-base font-bold" dangerouslySetInnerHTML={{__html: "$$\\Pi = i \\times CRT$$"}} />
              </div>
              <div className="bg-orange-100 p-3 rounded mt-4">
                <p className="text-sm font-semibold text-orange-800 mb-1">Example 1:</p>
                <p className="text-sm text-gray-700">A 0.1 m solution of K₃[Fe(CN)₆] shows ΔT<sub>f</sub> = 0.372°C. Calculate van't Hoff factor and degree of dissociation. Compare with theoretical complete dissociation.</p>
                <p className="text-sm text-green-700"><strong>Solution:</strong> Observed i = ΔT<sub>f</sub>/(K<sub>f</sub> × m) = 0.372/(1.86 × 0.1) = 2.0<br/>K₃[Fe(CN)₆] → 3K⁺ + [Fe(CN)₆]³⁻ (n = 4)<br/>Theoretical i = 4 (complete dissociation)<br/>Actual α = (i-1)/(n-1) = (2-1)/(4-1) = 0.33 = 33%<br/>Low dissociation due to ion-pair formation</p>
              </div>
              <div className="bg-orange-100 p-3 rounded mt-4">
                <p className="text-sm font-semibold text-orange-800 mb-1">Example 2:</p>
                <p className="text-sm text-gray-700">0.05m CH₃COOH freezes at -0.0975°C. Calculate van't Hoff factor and degree of dissociation.</p>
                <p className="text-sm text-green-700"><strong>Solution:</strong> Expected ΔT<sub>f</sub> = 1.86 × 0.05 = 0.093°C<br/>i = 0.0975/0.093 = 1.048<br/>α = (1.048-1)/(2-1) = 0.048 = 4.8%</p>
              </div>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 border-b-2 border-blue-200 pb-2">8. CBSE Board Questions (1 Mark)</h2>
            <div className="space-y-4">
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="text-lg font-bold mb-3">Multiple Choice Questions:</h3>
                <div className="space-y-3 text-sm">
                  <div><strong>1.</strong> Which of the following is a colligative property?<br/>(a) Surface tension (b) Viscosity (c) Osmotic pressure (d) Optical rotation<br/><span className="text-green-600">Answer: (c)</span></div>
                  <div><strong>2.</strong> Henry's law constant for CO<sub><strong>2</strong></sub> in water is 1.67 × 10<sup><strong>8</strong></sup> Pa. The law is applicable when:<br/>(a) Pressure is very high (b) Temperature is constant (c) Concentration is high (d) Gas reacts with solvent<br/><span className="text-green-600">Answer: (b)</span></div>
                  <div><strong>3.</strong> Molality of solution does not change with temperature because:<br/>(a) Volume changes (b) Mass remains constant (c) Density changes (d) Molarity changes<br/><span className="text-green-600">Answer: (b)</span></div>
                  <div><strong>4.</strong> Van't Hoff factor for Al<sub><strong>2</strong></sub>(SO<sub><strong>4</strong></sub>)<sub><strong>3</strong></sub> assuming complete dissociation is:<br/>(a) 2 (b) 3 (c) 5 (d) 6<br/><span className="text-green-600">Answer: (c)</span></div>
                  <div><strong>5.</strong> Raoult's law is obeyed by:<br/>(a) All solutions (b) Ideal solutions (c) Dilute solutions (d) Concentrated solutions<br/><span className="text-green-600">Answer: (b)</span></div>
                  <div><strong>6.</strong> The unit of molality is:<br/>(a) mol/L (b) mol/kg (c) g/L (d) kg/mol<br/><span className="text-green-600">Answer: (b)</span></div>
                  <div><strong>7.</strong> Which solution will have the highest boiling point?<br/>(a) 0.1 M glucose (b) 0.1 M NaCl (c) 0.1 M CaCl<sub><strong>2</strong></sub> (d) 0.1 M Al<sub><strong>2</strong></sub>(SO<sub><strong>4</strong></sub>)<sub><strong>3</strong></sub><br/><span className="text-green-600">Answer: (d)</span></div>
                  <div><strong>8.</strong> Osmotic pressure is a:<br/>(a) Intensive property (b) Extensive property (c) Colligative property (d) Both (a) and (c)<br/><span className="text-green-600">Answer: (d)</span></div>
                  <div><strong>9.</strong> The freezing point of 0.1 m NaCl solution is:<br/>(a) Higher than pure water (b) Lower than pure water (c) Same as pure water (d) Cannot be determined<br/><span className="text-green-600">Answer: (b)</span></div>
                  <div><strong>10.</strong> Which gas follows Henry's law most accurately?<br/>(a) NH<sub><strong>3</strong></sub> (b) HCl (c) N<sub><strong>2</strong></sub> (d) SO<sub><strong>2</strong></sub><br/><span className="text-green-600">Answer: (c)</span></div>
                </div>
              </div>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 border-b-2 border-blue-200 pb-2">9. CBSE Board Questions (2 Marks)</h2>
            <div className="space-y-4">
              <div className="bg-blue-50 p-4 rounded-lg">
                <h3 className="text-lg font-bold text-blue-800 mb-3">Short Answer Questions:</h3>
                <div className="space-y-4 text-sm">
                  <div className="bg-blue-100 p-3 rounded">
                    <p className="font-semibold mb-2">Q1. Define molality and molarity. Why is molality preferred over molarity in expressing concentration of solutions?</p>
                    <p className="text-green-700"><strong>Answer:</strong> Molality = moles of solute/kg of solvent. Molarity = moles of solute/L of solution. Molality is preferred because it doesn't change with temperature as mass remains constant, while volume changes with temperature affecting molarity.</p>
                  </div>
                  <div className="bg-blue-100 p-3 rounded">
                    <p className="font-semibold mb-2">Q2. State Henry's law. Give two applications of Henry's law.</p>
                    <p className="text-green-700"><strong>Answer:</strong> At constant temperature, solubility of gas in liquid is directly proportional to pressure of gas. Applications: (1) Soft drinks bottling under pressure (2) Deep sea diving - nitrogen narcosis prevention.</p>
                  </div>
                  <div className="bg-blue-100 p-3 rounded">
                    <p className="font-semibold mb-2">Q3. What is van't Hoff factor? Give its value for NaCl and glucose.</p>
                    <p className="text-green-700"><strong>Answer:</strong> Van't Hoff factor (i) = observed colligative property/calculated colligative property. For NaCl: i = 2 (dissociates into Na⁺ + Cl⁻). For glucose: i = 1 (doesn't dissociate).</p>
                  </div>
                  <div className="bg-blue-100 p-3 rounded">
                    <p className="font-semibold mb-2">Q4. Distinguish between ideal and non-ideal solutions with examples.</p>
                    <p className="text-green-700"><strong>Answer:</strong> Ideal solutions obey Raoult's law (ΔmixH = 0, ΔmixV = 0). Example: benzene + toluene. Non-ideal solutions deviate from Raoult's law. Positive deviation: ethanol + acetone. Negative deviation: chloroform + acetone.</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 border-b-2 border-blue-200 pb-2">10. CBSE Board Questions (3 Marks)</h2>
            <div className="space-y-4">
              <div className="bg-green-50 p-4 rounded-lg">
                <h3 className="text-lg font-bold text-green-800 mb-3">Numerical Problems:</h3>
                <div className="space-y-4 text-sm">
                  <div className="bg-green-100 p-3 rounded">
                    <p className="font-semibold mb-2">Q1. Calculate the molality of 20% (w/w) aqueous KOH solution. (Density = 1.2 g/mL)</p>
                    <p className="text-green-700"><strong>Solution:</strong> In 100g solution: 20g KOH, 80g water<br/>Moles KOH = 20/56 = 0.357 mol<br/>Molality = 0.357/(80/1000) = 4.46 m</p>
                  </div>
                  <div className="bg-green-100 p-3 rounded">
                    <p className="font-semibold mb-2">Q2. 1.0 g of non-electrolyte dissolved in 50g benzene lowered freezing point by 0.40K. Calculate molar mass. (Kf = 5.12 K·kg/mol)</p>
                    <p className="text-green-700"><strong>Solution:</strong> m = ΔTf/Kf = 0.40/5.12 = 0.078 m<br/>Moles = 0.078 × 0.05 = 0.0039 mol<br/>Molar mass = 1.0/0.0039 = 256 g/mol</p>
                  </div>
                  <div className="bg-green-100 p-3 rounded">
                    <p className="font-semibold mb-2">Q3. Calculate osmotic pressure of 0.1M glucose solution at 300K.</p>
                    <p className="text-green-700"><strong>Solution:</strong> π = CRT = 0.1 × 0.0821 × 300 = 2.463 atm</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 border-b-2 border-blue-200 pb-2">11. CBSE Board Questions (5 Marks)</h2>
            <div className="space-y-6">
              <div className="bg-red-50 p-4 rounded-lg">
                <h3 className="text-lg font-bold text-red-800 mb-3">Long Answer Questions:</h3>
                <div className="space-y-4 text-sm">
                  <div className="bg-red-100 p-3 rounded">
                    <p className="font-semibold mb-2">Q1. (a) Define colligative properties. Why are they called colligative? (b) Derive relationship between relative lowering of vapor pressure and mole fraction. (c) Calculate vapor pressure when 25g glucose dissolved in 100g water at 25°C. (p° = 23.8 mmHg)</p>
                    <p className="text-green-700"><strong>Answer:</strong><br/>(a) Properties depending only on number of particles, not nature. Called colligative from Latin 'colligere' meaning 'to bind together'.<br/>(b) p₁ = p₁° × χ₁; Relative lowering = (p₁° - p₁)/p₁° = χ₂<br/>(c) n(glucose) = 0.139 mol, n(water) = 5.56 mol; χ₂ = 0.024; p₁ = 23.23 mmHg</p>
                  </div>
                  <div className="bg-red-100 p-3 rounded">
                    <p className="font-semibold mb-2">Q2. (a) State Raoult's law for volatile and non-volatile solutes. (b) What are azeotropes? Types with examples. (c) Why can't azeotropes be separated by fractional distillation?</p>
                    <p className="text-green-700"><strong>Answer:</strong><br/>(a) Volatile: ptotal = pA° × χA + pB° × χB; Non-volatile: psolution = psolvent° × χsolvent<br/>(b) Binary mixtures with same composition in liquid and vapor. Minimum boiling: ethanol-water. Maximum boiling: HNO₃-water<br/>(c) Same composition in both phases prevents enrichment during distillation</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 border-b-2 border-blue-200 pb-2">12. Previous Year Board Questions</h2>
            <div className="space-y-4">
              <div className="bg-purple-50 p-4 rounded-lg">
                <h3 className="text-lg font-bold text-purple-800 mb-3">Previous Year Questions:</h3>
                <div className="space-y-3 text-sm">
                  <div className="bg-purple-100 p-3 rounded">
                    <p className="font-semibold mb-2">Q1. (3M) Calculate the boiling point of 0.1 molal aqueous solution of NaCl. Given: Kb = 0.52 K·kg/mol, assume 80% dissociation.</p>
                    <p className="text-green-700"><strong>Solution:</strong> i = 1 + α(n-1) = 1 + 0.8(1) = 1.8<br/>ΔTb = i × Kb × m = 1.8 × 0.52 × 0.1 = 0.094°C<br/>Boiling point = 100 + 0.094 = 100.094°C</p>
                  </div>
                  <div className="bg-purple-100 p-3 rounded">
                    <p className="font-semibold mb-2">Q2. (2M) Define osmotic pressure. Why is it better method for determining molar mass of polymers?</p>
                    <p className="text-green-700"><strong>Answer:</strong> External pressure applied to stop osmosis. Better for polymers because: (1) Measurable at room temperature (2) Other colligative properties show very small changes for large molecules</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 border-b-2 border-blue-200 pb-2">13. Important Formulas & Constants</h2>
            <div className="bg-yellow-50 p-4 rounded-lg">
              <div className="grid md:grid-cols-2 gap-4 text-sm">
                <div>
                  <h3 className="font-semibold mb-2">Concentration Units:</h3>
                  <ul className="space-y-1">
                    <li>• Mass % = (mass solute/mass solution) × 100</li>
                    <li>• Molarity = moles solute/L solution</li>
                    <li>• Molality = moles solute/kg solvent</li>
                    <li>• χA = nA/(nA + nB)</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Colligative Properties:</h3>
                  <ul className="space-y-1">
                    <li>• ΔTb = i × Kb × m</li>
                    <li>• ΔTf = i × Kf × m</li>
                    <li>• π = i × CRT</li>
                    <li>• Relative lowering = χsolute</li>
                  </ul>
                </div>
              </div>
              <div className="mt-4">
                <h3 className="font-semibold mb-2">Important Constants:</h3>
                <ul className="text-sm space-y-1">
                  <li>• Kb(water) = 0.512 K·kg/mol</li>
                  <li>• Kf(water) = 1.86 K·kg/mol</li>
                  <li>• R = 0.0821 L·atm/mol·K</li>
                  <li>• 1 atm = 101325 Pa</li>
                </ul>
              </div>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 border-b-2 border-blue-200 pb-2">14. Exam Strategy & Tips</h2>
            <div className="bg-blue-50 p-4 rounded-lg">
              <div className="space-y-4 text-sm">
                <div className="bg-blue-100 p-3 rounded">
                  <h3 className="font-semibold mb-2 text-blue-800">📊 High Weightage Topics (Total: 23 marks):</h3>
                  <ul className="list-disc list-inside space-y-1">
                    <li><strong>Colligative properties calculations:</strong> 5-8 marks (Most Important)</li>
                    <li><strong>Henry's law and Raoult's law:</strong> 3-5 marks</li>
                    <li><strong>Van't Hoff factor problems:</strong> 3 marks</li>
                    <li><strong>Concentration unit conversions:</strong> 2-3 marks</li>
                    <li><strong>Molecular mass determination:</strong> 3-5 marks</li>
                  </ul>
                </div>
                
                <div className="bg-red-100 p-3 rounded">
                  <h3 className="font-semibold mb-2 text-red-800">⚠️ Common Mistakes to Avoid:</h3>
                  <ul className="list-disc list-inside space-y-1">
                    <li><strong>Molarity vs Molality:</strong> Remember M changes with temperature, m doesn't</li>
                    <li><strong>Van't Hoff factor:</strong> Always multiply colligative properties by 'i' for ionic compounds</li>
                    <li><strong>Unit conversions:</strong> Convert mL to L, g to kg carefully</li>
                    <li><strong>Degree of dissociation:</strong> Use α = (i-1)/(n-1) formula correctly</li>
                    <li><strong>Significant figures:</strong> Maintain proper significant figures in calculations</li>
                  </ul>
                </div>
                
                <div className="bg-green-100 p-3 rounded">
                  <h3 className="font-semibold mb-2 text-green-800">✅ Exam Day Strategy:</h3>
                  <ul className="list-disc list-inside space-y-1">
                    <li><strong>Time management:</strong> Spend 15-20 minutes on this unit</li>
                    <li><strong>Formula sheet:</strong> Write key formulas on rough paper first</li>
                    <li><strong>Unit checking:</strong> Always check units in final answers</li>
                    <li><strong>Numerical problems:</strong> Show all steps clearly for partial marks</li>
                    <li><strong>Graph questions:</strong> Practice drawing and interpreting graphs</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 border-b-2 border-blue-200 pb-2">15. Memory Techniques & Mnemonics</h2>
            <div className="bg-purple-50 p-4 rounded-lg">
              <h3 className="text-lg font-bold text-purple-800 mb-2">🧠 Memory Aids</h3>
              <div className="space-y-3 text-sm">
                <div className="bg-purple-100 p-3 rounded">
                  <p className="font-semibold text-purple-800">Colligative Properties (BORE):</p>
                  <p className="text-gray-700"><strong>B</strong>oiling point elevation, <strong>O</strong>smotic pressure, <strong>R</strong>elative lowering of vapor pressure, <strong>E</strong>levation of freezing point</p>
                </div>
                <div className="bg-purple-100 p-3 rounded">
                  <p className="font-semibold text-purple-800">Henry's Law:</p>
                  <p className="text-gray-700">"<strong>H</strong>igher the <strong>P</strong>ressure, <strong>H</strong>igher the solubility" - p = K<sub><strong>H</strong></sub> × χ</p>
                </div>
                <div className="bg-purple-100 p-3 rounded">
                  <p className="font-semibold text-purple-800">Van't Hoff Factor:</p>
                  <p className="text-gray-700">NaCl = 2, CaCl<sub><strong>2</strong></sub> = 3, Al<sub><strong>2</strong></sub>(SO<sub><strong>4</strong></sub>)<sub><strong>3</strong></sub> = 5 (count total ions)</p>
                </div>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 border-b-2 border-blue-200 pb-2">16. Quick Revision Points</h2>
            <div className="bg-yellow-50 p-4 rounded-lg">
              <ul className="text-sm space-y-2">
                <li>• <strong>Molality:</strong> Temperature independent, preferred for colligative properties</li>
                <li>• <strong>Osmotic pressure:</strong> Best method for determining molar mass of macromolecules</li>
                <li>• <strong>Henry's law:</strong> Applies only to gases in equilibrium with solution (no reaction)</li>
                <li>• <strong>Raoult's law:</strong> Applicable to ideal solutions only</li>
                <li>• <strong>Van't Hoff factor:</strong> All colligative properties are modified by (i)</li>
                <li>• <strong>Abnormal molecular mass:</strong> Occurs due to association or dissociation</li>
                <li>• <strong>Azeotropes:</strong> Cannot be separated by simple distillation</li>
                <li>• <strong>Relative lowering:</strong> Equals mole fraction of non-volatile solute</li>
                <li>• <strong>Freezing point:</strong> Always decreases when solute is added</li>
                <li>• <strong>Boiling point:</strong> Always increases when non-volatile solute is added</li>
              </ul>
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}