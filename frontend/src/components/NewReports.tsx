
export default function NewReports() {
  
    return (
    <form >
        <input type="text"  placeholder="category"/>
        <input type="text"  placeholder="message"/>
         <select>
            <option value="low">low</option>
            <option value="medium">medium</option>
            <option value="high">high</option>
         </select>
    </form>
  )
}
