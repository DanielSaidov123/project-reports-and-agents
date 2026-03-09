import { useState } from "react"
import { createReportFromCSV } from "../api/axios"

export default function UpCSV() {
  const [FileCsv , setFileCsv] = useState<File | null>(null)
   async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()
         
        const formData= new FormData()
        formData.append('file', FileCsv?FileCsv:"")
        try {
            await createReportFromCSV(formData)
        } catch (error) {
            console.log(error)
        }
    }
  
    return (
    <form className='form-csv-components' onSubmit={handleSubmit} >
        <input type="file" accept=".csv" onChange={(e)=> setFileCsv(e.target.files?e.target.files[0]:null)}/>
        <button type="submit">שלח קובץ</button>
    </form>
  )
}
