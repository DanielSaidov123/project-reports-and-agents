
export default function FetchReports() {

  return (      
    <div >
      <table className="table">
  <thead>
    <tr>
      <th>Id</th>
      <th>Category</th>
      <th>Urgency</th>
      <th>Message</th>
      <th>SourceType</th>
      <th>Image</th>
      <th>CreatedAt</th>
    </tr>
  </thead>

  <tbody>
    
    <tr>
      <td>1</td>
      <td>Network</td>
      <td>High</td>
      <td>Internet not working</td>
      <td>agent</td>
      <td>img.png</td>
      <td>2026-03-10</td>
    </tr>
  </tbody>
</table>
    </div>
  );
}
