import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import algoliasearch from 'algoliasearch';

import {InstantSearch, Hits, SearchBox, Highlight} from 'react-instantsearch/dom';


function Product({hit}) {
  return (
    <div style={{marginTop: '10px'}}>
      <span className="hit-name">
        <Highlight attributeName="description" hit={hit} />
      </span>
    </div>
  );
};

/* This is Algolia based full text search on Projects & Tasks models.*/
class Search extends Component {
	 constructor(props) {
       super(props);
	    this.state = {searchTerm: '', projects:[], tasks:[], showPro:'none', showTas:'none'};
		this.client = algoliasearch("3TH8TDEWM4", 'a9b161bd8a26b32a4aa70f973d4101e0');
		this.doSearch = this.doSearch.bind(this);
		this.searchCallback = this.searchCallback.bind(this);
		this.showTasks = this.showTasks.bind(this);
		this.showProjects = this.showProjects.bind(this);
     }
     
     componentDidMount() {
		var that = this;
		
	   axios.get('/user/getSearchKey')
	   .then(response => {
// 			this.client = algoliasearch("3TH8TDEWM4", 'YTdkYjA5YTI4MWRhNTQ2MWM1ZDRmZDI1OWFiY2IzODU0Nzk4NjM4ODQyOTBkMGNhODA1ZmQwMmQ3ZTg0NGNhYmZpbHRlcnM9b3duZXJfdXNlcl9pZCUzQTE2');
			this.client = algoliasearch("3TH8TDEWM4", response.data);
		});
     }

     doSearch(e) {
     	var element = document.querySelector("#searchText");
		this.setState({
		  searchTerm: element.value
		});
     	console.log(element.value);
     	
// 		index.setSettings({
// 		  highlightPreTag: '<b>',
// 		  highlightPostTag: '<b>'
// 		});

		var queries = [{
		  indexName: 'projects',
		  query: element.value,
		  params: {
			hitsPerPage: 10
		  }
		}, {
		  indexName: 'tasks',
		  query: element.value,
		  params: {
			hitsPerPage: 10
// 			filters: '_tags:promotion'
		  }
		}];
// 		var index1 = this.client.initIndex('projects');
// 		var index2 = this.client.initIndex('tasks');

// 		index1.setSettings({
// 		  'attributesForFaceting': ['owner_user_id']
// 		});
// 		index2.setSettings({
// 		  'attributesForFaceting': ['owner_user_id']
// 		});

// 		index1.search(element.value, this.searchCallback);
		//index2.search(element.value, this.searchCallback);

		// perform search across multiple indexes
		this.client.search(queries, this.searchCallback);     	
     }

	 searchCallback(err, content) {
		if (err) {
			console.error(err);
			return;
		}
		let projects = [];
		let tasks = [];

		//fetch project's description from 1st result index
		var categories = content.results[0];
		
		for (var i = 0; i < categories.hits.length; ++i) {
			console.log(categories.hits[i]);
			// show as highlighted 
			projects.push(categories.hits[i]._highlightResult.description.value);
		}

		//fetch task's description from 2nd result index
		var tasks_results = content.results[1];
		for (var i = 0; i < tasks_results.hits.length; ++i) {
			console.log(tasks_results.hits[i]);

			tasks.push(tasks_results.hits[i]._highlightResult.description.value);
		}
		
		this.setState({
			projects: projects,
			tasks: tasks
		});
	}
	
	showProjects(inProjects) {
       if(this.state.projects instanceof Array && this.state.projects.length){
       	var that = this;

		return (
			<div>
				<h5><b>Projects description</b></h5>
					<ul>
						{this.state.projects.map(function(object, i){
							{/* put unescaped highlight text: https://shripadk.github.io/react/docs/jsx-gotchas.html
							*/}
				             return <li key={i} dangerouslySetInnerHTML={{__html: object}}/>;				             
							})
						}
					</ul>
			</div>
				)
       }
    }

	showTasks(inTasks) {
       if(this.state.tasks instanceof Array && this.state.tasks.length){
       	var that = this;
		return (
			<div>
				<h5><b>Tasks description</b></h5>
					<ul>
						{this.state.tasks.map(function(object, i){
				             return <li key={i} dangerouslySetInnerHTML={{__html: object}}/>;				             
							})
						}
					</ul>
			</div>
				)
       }
	}


  render(){
    return (
      <div>
        <h4 style={{textAlign: 'center'}}>Full text seacrh using Algolia on all Tasks & Projects.</h4>
			{/* 
		 <InstantSearch
			appId="3TH8TDEWM4"
			apiKey="a9b161bd8a26b32a4aa70f973d4101e0"
			indexName="projects">
			<div className="container">
		      <SearchBox />
		      <Hits hitComponent={Product} />
			</div>
		  </InstantSearch>
		  */}	
		  
        	<div className="form-group">
				<input className="searchText" id="searchText" type='text' placeholder="Search"/>
				<button type='button' className="btn btn-primary" onClick={this.doSearch}>Search</button>
			</div>
		{this.showProjects(this.state.projects)}
		{this.showTasks(this.state.tasks)}
{/*
		<span className="warn"> Currently It does not show user specific results. Work in Progress.</span>
		*/}		
		<span> If you see ambiguous results, kindly refer <a target="_blank" href="https://www.algolia.com/doc/guides/textual-relevance/typo-tolerance/">Typo Tolerance.</a></span>
  	  </div>
    )
  }
}

export default connect(null, null)(Search);