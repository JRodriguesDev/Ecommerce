'use client'

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { Star } from "lucide-react"
import { useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"

const FilterSideBar = () => {
    const router = useRouter()
    const searchParams = useSearchParams()
    const [minPrice, setMinPrice] = useState(0)
    const [maxPrice, setMaxPrice] = useState(0)
    const [inStock, setInStock] = useState(false)
    const [onSale, setOnSale] = useState(false)
    const [selectedRatings, setSelectedRatings] = useState<number[]>([])

    const handlerRatingChange = (rating: number, isChecked: boolean) => {
        if (isChecked) {setSelectedRatings((prev) => [...prev, rating])}
            else {setSelectedRatings((prev) => prev.filter((r) => r !== rating))}
        
    }

    const handlerApply = () => {
        const params = new URLSearchParams(searchParams.toString())
        if (minPrice) params.set('minPrice', minPrice.toString())
        if (maxPrice) params.set('maxPrice', maxPrice.toString())
        if (inStock) {params.set('inStock', String(inStock))} else {params.delete('inStock')}
        if (onSale) {params.set('onSale', String(onSale))} else {params.delete('onSale')}
        if (selectedRatings.length > 0) {params.set('selectedRatings', selectedRatings.join(','))} else {params.delete('selectedRatings')}
        router.push(`?${params.toString()}`, {scroll: false})
    }
    const handlerResetAll = () => {
        setMinPrice(0)
        setMaxPrice(0)
        setInStock(false)
        setOnSale(false)
        setSelectedRatings([])
        const category = searchParams.get('cat')
        const query = searchParams.get('q')
        const params = new URLSearchParams()
        if (category) params.set('cat', category)
        if (query) params.set('q', query)
        router.push(`?${params.toString()}`, {scroll: false})
    }

    return (
        <div className="w-full space-y-6 p-5 bg-zinc-950/40 border border-zinc-800/50 rounded-xl backdrop-blur-sm">
            <div>
                <h2 className="text-xl font-bold tracking-tight text-zinc-100">Filters</h2>
                <p className="text-xs text-zinc-500 mt-1">Refine your results</p>
            </div>
            
            <Separator className="bg-zinc-800/50" />

            <Accordion type="multiple" defaultValue={["price", "stock"]} className="w-full">
                
                {/* Price Range Section */}
            <AccordionItem value="price" className="border-zinc-800">
                <AccordionTrigger className="text-zinc-200 hover:text-blue-500 py-4 text-sm font-semibold">
                Price Range
            </AccordionTrigger>
            <AccordionContent className="pt-2 px-1">
        <div className="flex items-center gap-3">
            {/* Min Price */}
            <div className="flex-1 space-y-1.5">
                <Label htmlFor="min-price" className="text-[10px] uppercase text-zinc-500 font-bold ml-1">
                    Min ($)
                </Label>
                <Input 
                    id="min-price"
                    type="number"
                    placeholder="0"
                    onChange={(e) => setMinPrice(Number(e.target.value))}
                    className="h-9 bg-zinc-900 border-zinc-800 text-zinc-200 focus-visible:ring-blue-600 focus-visible:border-blue-600 transition-all [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                />
            </div>

            <span className="text-zinc-600 mt-6">—</span>

            {/* Max Price */}
            <div className="flex-1 space-y-1.5">
                <Label htmlFor="max-price" className="text-[10px] uppercase text-zinc-500 font-bold ml-1">
                    Max ($)
                </Label>
                <Input 
                    id="max-price"
                    type="number"
                    placeholder="1000"
                    onChange={(e) => setMaxPrice(Number(e.target.value))}
                    className="h-9 bg-zinc-900 border-zinc-800 text-zinc-200 focus-visible:ring-blue-600 focus-visible:border-blue-600 transition-all [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                />
            </div>
        </div>
    </AccordionContent>
</AccordionItem>
                {/* Stock Status */}
                <AccordionItem value="stock" className="border-zinc-800">
                    <AccordionTrigger className="text-zinc-200 hover:text-blue-500 py-4 text-sm font-semibold">
                        Availability
                    </AccordionTrigger>
                    <AccordionContent className="space-y-4 pt-2">
                        <div className="flex items-center space-x-3 group cursor-pointer">
                            <Checkbox id="in-stock" checked={inStock} onCheckedChange={(checked) => setInStock(!!checked)} className="border-zinc-700 data-[state=checked]:bg-blue-600 data-[state=checked]:border-blue-600" />
                            <Label htmlFor="in-stock" className="text-sm text-zinc-400 group-hover:text-zinc-200 cursor-pointer transition-colors">
                                In Stock Only
                            </Label>
                        </div>
                        <div className="flex items-center space-x-3 group cursor-pointer">
                            <Checkbox disabled={true} id="on-sale" checked={onSale} onCheckedChange={(checked) => setOnSale(!!checked)} className="border-zinc-700 data-[state=checked]:bg-blue-600 data-[state=checked]:border-blue-600" />
                            <Label htmlFor="on-sale" className="text-sm text-zinc-400 group-hover:text-zinc-200 cursor-pointer transition-colors">
                                On Sale
                            </Label>
                        </div>
                    </AccordionContent>
                </AccordionItem>

                {/* Customer Rating */}
                <AccordionItem value="rating" className="border-zinc-800">
                    <AccordionTrigger className="text-zinc-200 hover:text-blue-500 py-4 text-sm font-semibold">
                        Customer Rating
                    </AccordionTrigger>
                    <AccordionContent className="space-y-3 pt-2">
                        {[5, 4, 3, 2, 1].map((rating) => (
                            <div key={rating} className="flex items-center space-x-3 group">
                                <Checkbox id={`rating-${rating}`} checked={selectedRatings.includes(rating)} onCheckedChange={(checked) => handlerRatingChange(rating, !!checked)} className="border-zinc-700" />
                                <Label htmlFor={`rating-${rating}`} className="flex items-center gap-1 text-sm text-zinc-400 group-hover:text-zinc-200 cursor-pointer">
                                    {rating}+ <Star size={12} className="fill-yellow-500 text-yellow-500" />
                                </Label>
                            </div>
                        ))}
                    </AccordionContent>
                </AccordionItem>
                {/* Botão de Ação no final do Sidebar */}
<div className="pt-4">
    <Button 
        onClick={handlerApply}
        className="w-full bg-blue-600 hover:bg-blue-700 text-zinc-100 font-bold py-5 rounded-lg shadow-lg shadow-blue-900/20 transition-all active:scale-[0.98]"
    >
        Apply Filters
    </Button>
    
    {/* Opcional: Link para resetar */}
    <button 
        onClick={handlerResetAll}
        className="w-full mt-3 text-xs text-zinc-500 hover:text-zinc-300 transition-colors"
    >
        Reset all preferences
    </button>
</div>

            </Accordion>
        </div>
    )
}

export default FilterSideBar