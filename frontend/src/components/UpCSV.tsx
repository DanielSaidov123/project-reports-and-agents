import { useState } from "react"
import { createReportFromCSV } from "../api/axios"
import { useRequest } from "../Hooks/useRequest"

export default function UpCSV() {
  const [FileCsv , setFileCsv] = useState<File | null>(null)
  const { request, loading, error, success } = useRequest()
   async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()
         
        const formData= new FormData()
        formData.append('file', FileCsv?FileCsv:"")
        try {
            await request(()=>createReportFromCSV(formData))
        } catch (error) {
            console.log(error)
        }
    }
  
    return (
    <form className='form-csv-components' onSubmit={handleSubmit} >
        <input type="file" accept=".csv" onChange={(e)=> setFileCsv(e.target.files?e.target.files[0]:null)}/>
        <button type="submit">{loading?"loading...":"שלח קובץ"}</button>
        {error && <p>{error}</p> }
        {success && <p>csv up</p>}
    </form>
  )
}
