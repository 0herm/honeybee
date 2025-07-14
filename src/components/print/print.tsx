'use client'

import React, { useState, useRef } from 'react'
import { useReactToPrint } from 'react-to-print'
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from '../ui/dialog'
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '../ui/select'
import { Label } from '../ui/label'
import { Button } from '../ui/button'

type OptionsProps = {
    font: string
    listStyle: string
    listDirection: string
    instructionStyle: string
    instructionPosition: string
}

function RecipeContent({ recipe, options }: { recipe: RecipeProps; options: OptionsProps }) {
    return (
        <div className={`${options.font !== 'none' ? options.font : ''} pl-[5rem] pt-[2.5rem] pr-[2.5rem] leading-relaxed break-inside-avoid`}>
            <h1 className='text-2xl font-bold mb-[0.5rem] capitalize'>{recipe.title}</h1>
            <p className='text-gray-600'>Porsjoner: {recipe.quantity}</p>
            <p className='text-gray-600'>Total tid: {recipe.duration} minutter</p>
            <hr className='my-[1.25rem] border-t-[0.1rem] border-gray-300' />
            <h2 className='text-base font-semibold'>Ingredienser:</h2>
            <div className={`flex ${options.listDirection === 'row' ? 'flex-row gap-[2rem]' : 'flex-col gap-[0.5rem]'}`}>
                {recipe.ingredients.map((part, index) => (
                    <div key={index} className='break-inside-avoid'>
                        <h3 className='text-base font-semibold capitalize'>{part.title}</h3>
                        <ul className={`${options.listStyle !== 'none' ? `${options.listStyle} pl-[1rem]` : ''}`}>
                            {part.ingredients.map((ingredient, idx) => (
                                <li key={idx} className='text-base'>
                                    {ingredient.quantity} {ingredient.ingredient}
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>
            <div className='mt-[1.25rem] break-inside-avoid'>
                <p className='whitespace-pre-wrap'>{recipe.instructions}</p>
            </div>
        </div>
    )
}

export default function PrintButton({ recipe }: { recipe: RecipeProps }) {
    const availableOptions = {
        font: {
            name: 'Skrifttype',
            items: [
                { value: 'none', label: 'Standard' },
                { value: 'font-sans', label: 'Sans' },
            ],
        },
        listStyle: {
            name: 'Listeformat',
            items: [
                { value: 'none', label: 'Ingen' },
                { value: 'list-disc', label: 'Punktliste' },
            ],
        },
        listDirection: {
            name: 'Listeretning',
            items: [
                { value: 'col', label: 'Vertikalt' },
                { value: 'row', label: 'Horisontalt' },
            ],
        },
        instructionStyle: {
            name: 'Instruksjonsformat',
            items: [
                { value: 'none', label: 'Ingen' },
                { value: 'decimal', label: 'Nummerert' },
            ],
        },
        instructionPosition: {
            name: 'Instruksjonsposisjon',
            items: [
                { value: 'bottom', label: 'Bunn' },
                { value: 'right', label: 'Høyre' },
            ],
        },
    }

    const contentRef = useRef<HTMLDivElement>(null)
    const [options, setOptions] = useState<OptionsProps>({
        font:                   availableOptions.font.items[0].value,
        listStyle:              availableOptions.listStyle.items[0].value,
        listDirection:          availableOptions.listDirection.items[0].value,
        instructionStyle:       availableOptions.instructionStyle.items[0].value,
        instructionPosition:    availableOptions.instructionPosition.items[0].value
    })

    const reactToPrintFn = useReactToPrint({
        contentRef: contentRef,
        documentTitle: recipe.title.replace(/\s+/g, '-'),
    })

    return (
        <div className='w-full flex flex-col items-center sm:items-end pt-[2rem]'>
            <Dialog>
                <DialogTrigger asChild>
                    <Button className='px-[1rem] py-[0.5rem] bg-green-700/70 text-white rounded-md hover:bg-green-900'>
                        Print Oppskrift
                    </Button>
                </DialogTrigger>
                <DialogContent className='sm:max-w-[calc(100%-2rem)] sm:w-auto overflow-y-auto'> 
                    <DialogHeader>
                        <DialogTitle>Print Valg</DialogTitle>
                        <DialogDescription>Tilpass hvordan oppskriften din vil se ut når den skrives ut.</DialogDescription>
                    </DialogHeader>
                    <div className='flex flex-col gap-4 py-4'>
                        {Object.entries(availableOptions).map(([key, { name, items }]) => (
                            <div key={key} className='grid grid-cols-4 items-center gap-4'>
                                <Label htmlFor={key} className='text-right'>
                                    {name}
                                </Label>
                                <div className='col-span-3'>
                                    <Select
                                        value={options[key as keyof OptionsProps]}
                                        onValueChange={(value) =>
                                            setOptions((prev) => ({ ...prev, [key]: value }))
                                        }
                                    >
                                        <SelectTrigger>
                                            <SelectValue placeholder={`Select ${name}`} />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {items.map((item) => (
                                                <SelectItem key={item.value} value={item.value}>
                                                    {item.label}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>
                        ))}
                    </div>
                    <DialogFooter>
                        <Button
                            onClick={reactToPrintFn}
                            className='px-[1rem] py-[0.5rem] bg-green-700/70 text-white rounded-md hover:bg-green-900'
                        >
                            Print
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
            <div ref={contentRef} className='hidden print:block'>
                <RecipeContent recipe={recipe} options={options} />
            </div>
        </div>
    )
}