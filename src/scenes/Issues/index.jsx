import React, { useEffect, useState } from 'react';
import IssueService from '../../services/IssueService';
import IssuesList from './components/list/IssuesList';
import PageControl from '../../util/components/PageControl';
import "./style.css";
import { usePagination } from '../../util/hooks/usePagination';
import IssuesSearchbox from './components/searchbox/IssuesSearchbox';
import Loader from '../../util/components/Loader';

export default function IssuesScene(){
    const totalItemsPerPage = 15;
    const [issues, setIssues] = useState([]);
    const [filteredIssues, setFilteredIssues] = useState([]);
    const [currentPage, totalPages, setTotalPages, changePage] = usePagination();
    const [searchText, setSearchText] = useState("");
    const [fetching, setFetching] = useState(false);
    

    useEffect(() => {
        getIssues(currentPage);
    }, [currentPage])

    const getIssues = (currentPage) => {
        setFetching(true);
        ( async () => {
            try {
                let issuesData = await IssueService.getIssues(currentPage, totalItemsPerPage);
                setIssues(issuesData.items);
                setFilteredIssues(issuesData.items);
                // Only first 1000 search results are available 
                // source: "https://docs.github.com/v3/search/"
                setTotalPages(Math.floor(1000 / totalItemsPerPage));
                setFetching(false);
            } catch (err) {
                console.log(err);
            }
        })();
    }

    

      const filterIssues = () => {
        setFilteredIssues(issues.filter(issue => {
            return issue.title.toLowerCase().includes(searchText.toLowerCase()) || issue.body.toLowerCase().includes(searchText.toLowerCase());
          }))
      }

    return (
        <div style={{'width' : '80%'}}>
            <IssuesSearchbox issues={issues} searchText={searchText} setSearchText={setSearchText} filterIssues={() => {console.log("filterin"); filterIssues()}}/>
            {!fetching 
                ? <IssuesList className="issue-container" issues={filteredIssues}/>
                : <Loader/>
            }
            <PageControl currentPage={currentPage} totalPages={totalPages} goToPage={(newPage) => {
                changePage(newPage)
                setSearchText("")
            }}/>
        </div>
    )
}