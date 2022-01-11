import React from 'react';
import Main from '../layouts/Main';
// import Form from "@rjsf/core";
import Form from '@rjsf/fluent-ui';
import schema from './schema.json';
import Print from './Print';

import { Link } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import raw from 'raw.macro';
const LinkRenderer = ({ ...children }) => <Link {...children} />;
const markdown = raw('../data/config.md');

class Vector3Field extends React.Component {
  constructor(props) {
    super(props);
    this.props = props;
    this.state = {...props.formData};
  }

  onChange(name) {
    return (event) => {
      this.setState({
        [name]: parseFloat(event.target.value)
      }, () => this.props.onChange(this.state));
    };
  }

  render() {
    const {x, y, z} = this.state;
    return (
      <div style={({ display: "flex", justifyContent: "start", alignItems: "center" })}>
        <span>{this.props.name}</span>
        <p style={({fontSize: "20px", marginLeft: "30px", marginRight: "10px", marginTop: "10px", marginBottom: "10px"})}>x</p><input className="ant-input" type="number" value={x} onChange={this.onChange("x")} />
        <p style={({fontSize: "20px", marginLeft: "30px", marginRight: "10px", marginTop: "10px", marginBottom: "10px"})}>y</p><input className="ant-input" type="number" value={y} onChange={this.onChange("y")} />
        <p style={({fontSize: "20px", marginLeft: "30px", marginRight: "10px", marginTop: "10px", marginBottom: "10px"})}>z</p><input className="ant-input" type="number" value={z} onChange={this.onChange("z")} />
      </div>
    );
  }
}

class ContentPack extends React.Component {
  constructor(props) {
    super(props);
    this.container = React.createRef();
    const formData = {
      tvs: [
        {
          name: "IMAX",
          tv: {
            resourceId: "1907712315046757301",
            transform: {
              position: {x: 0, y: 0, z: 0},
              rotation: {x: 0, y: 0, z: 0},
              scale: {x: 10, y: 10, z: 10},
            }
          },
          remote: {
            resourceId: "1904931242722197763",
            transform: {
              position: {x: 0, y: 0, z: -4},
              rotation: {x: 0, y: 0, z: 0},
              scale: {x: 1, y: 1, z: 1},
            }
          },
          chair: {
            resourceId: "1906640837660377174",
            transform: {
              position: {x: 0, y: 0, z: -5},
              rotation: {x: 0, y: 0, z: 0},
              scale: {x: 1, y: 1, z: 1},
            }
          }
        }
      ],
      channels: [
        {
          name: "Luminosity TV",
          url: "https://www.illuminati360.xyz/hls/luminosity.m3u8",
          countries: "US,UK",
          categories: "Music,Relax"
        }
      ],
      password: {
        password: "123456"
      }
    };
    this.state = { formData, translate: this.translate(formData) };
  }

  handleChange = ({ formData }) => {
    this.setState({ formData, translate: this.translate(formData) });
  };

  handleSubmit = () => {
    navigator.clipboard.writeText(JSON.stringify(this.state.translate,null,4));
    alert('Copied to clipboard');
  }

  translate(form){
    const obj = JSON.parse(JSON.stringify(form));
    obj.password = obj.password.password;
    if (obj.tvs){
      obj.tvs.forEach(t=>{
        t.tv.resourceId = `artifact:${t.tv.resourceId}`;
        t.remote.resourceId = `artifact:${t.remote.resourceId}`;
        t.chair.resourceId = `artifact:${t.chair.resourceId}`;
        const tv = t.tv;
        delete t.tv;
        Object.assign(t, tv);
      });
    }
    if (obj.channels){
      obj.channels.forEach(ch=>{
        ch.countries = ch.countries ? ch.countries.split(',').map(c=>({code: c})) : [];
        ch.categories = ch.categories ? ch.categories.split(',').map(c=>({name: c})) : [];
      });
    }
    return obj;
  }

  render() {
    const uiSchema = {
      tvs: {
        items: {
          tv: {
            transform: {
              position: {
                "ui:field": "vector3"
              },
              rotation: {
                "ui:field": "vector3"
              },
              scale: {
                "ui:field": "vector3"
              }
            }
          },
          remote: {
            transform: {
              position: {
                "ui:field": "vector3"
              },
              rotation: {
                "ui:field": "vector3"
              },
              scale: {
                "ui:field": "vector3"
              }
            }
          },
          chair: {
            transform: {
              position: {
                "ui:field": "vector3"
              },
              rotation: {
                "ui:field": "vector3"
              },
              scale: {
                "ui:field": "vector3"
              }
            }
          }
        }
      },
      channels: {
        items: {
        }
      }
    };
    const fields = {
      vector3: Vector3Field
    }
    return (
      <Main fullPage={true}>
        <div>
        <article className="post markdown" id="instructions">
          <header>
            <div className="title">
              <h2 data-testid="heading"><Link to="/about">Instructions</Link></h2>
            </div>
          </header>
          <ReactMarkdown
            source={markdown}
            renderers={{
              Link: LinkRenderer,
            }}
            escapeHtml={false}
          />
        </article>
          <div style={({float: "left", width: "60%"})}>
            <div style={({ display: "flex", justifyContent: "start", alignItems: "start" })}>
              <Form schema={schema} uiSchema={uiSchema} fields={fields} onChange={this.handleChange} onSubmit={this.handleSubmit} formData={this.state.formData}></Form>
            </div>
          </div>
          <div style={({float: "left", width: "40%"})}>
            <Print data={this.state.translate} />
          </div>
        </div>
      </Main>
    );
  }
}

export default ContentPack;