import { BugPreview } from "./BugPreview.jsx";
const { Link } = ReactRouterDOM

export function BugList({ bugs, onRemoveBug, onEditBug }) {

    return < ul className="bug-list" >
        {
            bugs.map(bug => <article className="bug-preview" key={bug._id}>
                <BugPreview bug={bug} />
                <div>
                    <button onClick={() => onRemoveBug(bug._id)}>x</button>
                    <button onClick={() => onEditBug(bug)}>Edit</button>
                </div>
                <Link to={`/bug/${bug._id}`}>Details</Link>
            </article>
            )
        }
    </ul >
}