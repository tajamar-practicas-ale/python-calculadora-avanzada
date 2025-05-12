import React from 'react'

const Historial = () => {
    return (
        <section className='bg-purple-100 p-5 rounded-2xl border shadow-xl'>
            <table>
                <thead className='border-b bg-purple-400 rounded-tr-xl rounded-tl-xl'>
                    <th className='p-2 px-3'>Fecha</th>
                    <th className='p-2 px-3'>Operación</th>
                    <th className='p-2 px-3'>Parámetro</th>
                    <th className='p-2 px-3'>Resultado</th>
                </thead>
                <tbody>
                    <tr className='border-b'>
                        <td className='p-2 px-3 text-center'>asdasd</td>
                        <td className='p-2 px-3 text-center'>asdasd</td>
                        <td className='p-2 px-3 text-center'>asdasd</td>
                        <td className='p-2 px-3 text-center'>asdasd</td>
                    </tr>
                </tbody>
            </table >
        </section >
    )
}

export default Historial