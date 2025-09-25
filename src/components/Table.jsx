
const Table = (props) => {

    if (props.content) {
        
    const content = props.content

    // const tableHeader = Object.getOwnPropertyNames(content[0])

    // const headerContent = tableHeader.map((element)=>{
    //     return <th scope ="col">{element}</th>
    // })

    const tableContent = content.map((element)=> {
        return <tr key={element.id} className="border-2 border-black m-[10px]">
                    <td>{element.userid}</td>
                    <td>{element.category_id}</td>
                    <td>{element.amount}</td>
                    <td>{element.note}</td>
                    <td>{element.date_create}</td>
                    <td>{element.date_update}</td>
                </tr>
    })

    return <div className="">
        <table className="border-2 border-black m-[10px]">
            <caption>
                Lista spese di tutti gli utenti
            </caption>
            <thead>
                <tr>
                    <th scope="col">user id</th>
                    <th scope="col">category id</th>
                    <th scope="col">amount</th>
                    <th scope="col">note</th>
                    <th scope="col">date create</th>
                    <th scope="col">date update</th>
                </tr>
            </thead>
            <tbody>
                {tableContent}
            </tbody>
        </table>
    </div>
    }

    return <div></div>

}

export default Table