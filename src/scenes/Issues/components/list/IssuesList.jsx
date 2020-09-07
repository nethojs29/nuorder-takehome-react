import React from 'react';
import Issue from '../../../../components/Issue'

export default function IssuesList({issues}){
    
    return (
        <section style={{'width': '100%'}}>
            {issues.map(issue => {
                return <Issue key={issue.id} issue={issue}/>
            })}
        </section>
    )
}