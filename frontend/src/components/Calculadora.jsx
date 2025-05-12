import React from 'react'

const Calculadora = () => {
    return (
        <form className='border rounded-2xl shadow-xl bg-amber-100 flex flex-col gap-5 py-8 px-12'>
            <h2 className='text-center font-bold text-xl'>Calculadora</h2>
            <select name="" id="" className='border bg-amber-200 rounded-md px-2 py-1'>
                <option value="">Sumar</option>
            </select>
            <div className='flex flex-col gap-3'>
                < input type="text" className='border rounded-md bg-amber-200 px-2 py-1' placeholder='Primer número' />
                < input type="text" className='border rounded-md bg-amber-200 px-2 py-1' placeholder='Segundo número' />
            </div>
        </form >
    )
}

export default Calculadora