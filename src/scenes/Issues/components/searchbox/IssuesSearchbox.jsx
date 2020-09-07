import React, { useState, useEffect } from 'react';
import "./searchbox.css";

export default function IssuesSearchbox({issues, filterIssues, searchText, setSearchText}){

    const onKeyDown = (e) => {
        if (e.key === 'Enter' && searchText.length > 0) filterIssues();
        if (e.key === 'Backspace' && searchText.length < 1) filterIssues();
    }

    useEffect(() => {
        
        
        window.addEventListener('keyup', onKeyDown);

        return () => window.removeEventListener('keyup', onKeyDown);
    }, [searchText])
    
    return (
        <span className="search-container">
            <input
                list="issues"
                className="search"
                type="text"
                placeholder="Search all issues"
                value={searchText}
                onChange={e => {
                    setSearchText(e.target.value)
                }}
            />
            <datalist id="issues">
                {issues.map(issue => <option key={issue.id}>{issue.title}</option>)}
            </datalist>
        </span>
    )   
}