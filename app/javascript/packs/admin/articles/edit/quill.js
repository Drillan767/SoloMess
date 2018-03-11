import React from 'react';
import ReactQuill from 'react-quill';

ReactQuill.modules = {
    toolbar: {
        container: [
            [{size: []}, { 'font': [] }],
            [{'align': []}, 'bold', 'italic', 'underline', 'strike', 'blockquote', 'code', 'link'],
            [{'list': 'ordered'}, {'list': 'bullet'},
                {'indent': '-1'}, {'indent': '+1'}],
            ['clean'],
        ]
    },
};

export default class Quill extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            text: ''
        }
    }

    handleChange(value) {
        this.setState({text: value})
    }

    shouldComponentUpdate(nextProps, nextState) {
        if(this.state.text !== nextState.text) {
            return true
        }

        if(this.props.className !== nextProps.className) {
            return true;
        }

        return false;
    }

    render() {

        const { className, value } = this.props;

        return (
            [
                <textarea
                    id="content"
                    key={0}
                    readOnly
                    name="article[content]"
                    className={className}
                    value={value}
                />,
                <ReactQuill
                    key={1}
                    value={this.state.text}
                    onChange={this.handleChange.bind(this)}
                    modules={ReactQuill.modules}
                    formats={ReactQuill.formats}
                    ref={(el) => this.quillRef = el}
                />
            ]
        )
    }
}