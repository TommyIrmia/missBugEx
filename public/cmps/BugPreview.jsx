
export function BugPreview({ bug, onRemoveBug, onEditBug }) {

    return <li className="bug-preview" >
        <h4>{bug.title}</h4>
        <h1>🐛</h1>
        <p>Severity: <span>{bug.severity}</span></p>
        <p>owner: <span>{bug.ownerId}</span></p>
    </li>

}