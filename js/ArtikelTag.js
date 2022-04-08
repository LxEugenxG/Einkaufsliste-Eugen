class ArtikelTag extends React.Component {

  render = () => {
     
    return (
      <div className="artikel">
          <label htmlFor="checkbox1">
              <input id="checkbox1" type="checkbox" onChange={()=>this.props.checkHandler(this.props.artikel)}
                 checked={this.props.artikel.gekauft}/>{this.props.artikel.gekauft ? 
              <s>{this.props.artikel.name}</s> : this.props.artikel.name}
          </label>
          <i onClick={() => {this.props.deleteHandler(this.props.artikel.name)}} className="material-icons">delete</i>
      </div>
    )
  }
}
