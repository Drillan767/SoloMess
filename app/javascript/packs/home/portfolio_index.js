import React from 'react';
import utils from '../lib/functionsLibrary';
import { Link } from "react-router-dom";

export default class Portfolios extends React.Component {

    constructor(props) {
        super(props);
        this.state = {projects: null};
    }

    componentDidMount() {
        let self = this;
        utils.loader(window.location.origin + '/all_projects.json', function(projects) {
            self.setState({projects: projects})
        });

    }

    render() {
        const { projects } = this.state;

        const ProjectAPI = {
            projects: projects,
            all: function() { return this.projects},
            get: function(slug) {
                const project = p => p.slug = slug;
                return this.projects.find(project)
            }
        };


        return (
            <div className="container">
                <div className="row">
                    <ul>
                        {
                            projects !== null &&
                            ProjectAPI.all().map(function(p, i) {
                                return (
                                    <li key={i}>
                                        <Link to={`/project/${p.slug}`}>{p.title}</Link>
                                    </li>
                                )
                            })
                        }
                    </ul>

                </div>
            </div>
        )
    }
}