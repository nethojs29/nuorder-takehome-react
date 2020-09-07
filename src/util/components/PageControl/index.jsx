import React from 'react';
import "./style.css";

//Premade component which I always adapt to the API's pagination.

//Componente para manejo de paginación de lado del Servidor.
class ServerPagination extends React.Component {
    constructor(props){
        super(props);
        
        this.state = {
            totalPages: 0,
            currentPage: 0
        }
    }

    componentDidUpdate(prevProps) {
        if(this.props.currentPage !== this.state.currentPage || this.props.totalPages !== this.state.totalPages){
            this.setState({currentPage: this.props.currentPage, totalPages: this.props.totalPages});
        }
    }

    render(){
        if(this.state.totalPages <= 1) return null;

        return (
            <div>
                <nav className="pagination is-centered" role="navigation" aria-label="pagination">
                    <a disabled={this.state.currentPage === 1} onClick={() => {
                        if(this.state.currentPage !== 1) this.props.goToPage(this.state.currentPage - 1)
                        }} className={`pagination-previous ${this.state.currentPage !== 1 ? "pagination-link" : "pagination-link-disabled"}`}>{`< Previous`}</a>
                    <span className="pagination-list">
                        {this.state.currentPage > 1 && <span><a onClick={() => this.props.goToPage(1)} className="pagination-page pagination-link" aria-label="Go to page 1">1</a></span>}
                        {this.state.currentPage - 2 > 1 && <span><span className="pagination-ellipsis">&hellip;</span></span>}
                        {this.state.currentPage > 1 && this.state.currentPage - 1 != 1 && <span><a onClick={() => this.props.goToPage(this.state.currentPage - 1)} className="pagination-page pagination-link" aria-label="Go to previous">{this.state.currentPage - 1}</a></span>}
                        <span><a className="pagination-page pagination-link is-current" aria-label="current " aria-current="page">{this.state.currentPage}</a></span>
                        {this.state.currentPage < this.state.totalPages && this.state.currentPage + 1 != this.state.totalPages && <span><a onClick={() => this.props.goToPage(this.state.currentPage + 1)} className="pagination-page pagination-link" aria-label="Go to next">{this.state.currentPage + 1}</a></span>}
                        {this.state.currentPage + 2 < this.state.totalPages && <span><span className="pagination-ellipsis">&hellip;</span></span>}
                        {this.state.currentPage < this.state.totalPages && <span><a onClick={() => this.props.goToPage(this.state.totalPages)} className="pagination-page pagination-link" aria-label="Go to last page">{this.state.totalPages}</a></span>}
                    </span>
                    <a disabled={this.state.currentPage === this.state.totalPages} onClick={() => {
                        if (this.state.currentPage !== this.state.totalPages)
                            this.props.goToPage(this.state.currentPage + 1)
                        }} className={`pagination-previous ${this.state.currentPage !== this.state.totalPages ? "pagination-link" : "pagination-link-disabled"}`}>{`Next >`}</a>
                </nav>
            </div>
        )
    }
}

export default ServerPagination;