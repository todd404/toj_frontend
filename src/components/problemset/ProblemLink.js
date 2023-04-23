import { Link } from 'umi';

export default function ProblemLink({id, title}){
    return(
        <Link to={`/problem/${id}`}>{`${id}.${title}`}</Link>
    )
}