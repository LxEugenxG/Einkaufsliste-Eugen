class ShoppingTag extends React.Component {
    constructor() {
        super();
        
        App.datenEinlesen()
        
        this.state = {aktiveGruppe: 1, gruppenListe:App.gruppenListe,
            einkaufenAufgeklappt: true, erledigtAufgeklappt: false,showGruppenDialog: false}
        
    }

    setAktivGruppe = (gruppenID) => {
        this.setState({aktiveGruppe: gruppenID})
        App.aktiveGruppe = gruppenID
    }

    artikelChecken = (artikel) => {
        artikel.gekauft = !artikel.gekauft

        this.setState(this.state)
    }

    artikelHinzufuegen = () => {
        let eingabe = document.getElementById("eingabe")
        let neuerName = eingabe.value.trim()
        console.log(this.state)
        if (neuerName.length > 0) {
            let gruppeFinden = App.gruppeFinden(this.state.aktiveGruppe)
            gruppeFinden.artikelHinzufuegen(neuerName, this.state.menge)
            this.setState({
                gruppenListe: App.gruppenListe
            })
        }
        eingabe.value = ""
        eingabe.focus()
    }


    toggleEinkaufenAufgeklappt = () => {
        this.setState({einkaufenAufgeklappt: !this.state.einkaufenAufgeklappt})
    }

    toggleErledigtAufgeklappt = () => {
        this.setState({erledigtAufgeklappt: !this.state.erledigtAufgeklappt})
    }

    gruppenDialogOpen = () => { 
        this.setState({showGruppenDialog: !this.state.showGruppenDialog})
    }


    render = () => {


        return (

            <div>
                <header>
                    <h1>Einkaufsliste</h1>
                    <div>

                        <label htmlFor="Artikel"><input type="text" id="eingabe" placeholder="Artikel hinzufügen"
                                                        autoComplete="on"/></label>
                        <button onClick={this.artikelHinzufuegen}><span className="material-icons">add_circle</span>
                        </button>
                    </div>
                </header>

                <main>
                    <section>
                        <nav>
                            <h2>Einkauf
                                <i onClick={this.toggleEinkaufenAufgeklappt} className="material-icons">{this.state.einkaufenAufgeklappt ? "expand_less":"expand_more" }</i>
                            </h2>
                            <dl>
                                {this.state.einkaufenAufgeklappt && App.gruppenListe.map(gruppe => (
                                    <GruppenTag key={gruppe.id} gruppe={gruppe} setAktivGruppe={this.setAktivGruppe}
                                                erledigt={false} aktiv={gruppe.id === this.state.aktiveGruppe}
                                                checkHandler={this.artikelChecken}/>
                                ))}
                            </dl>
                        </nav>
                    </section>
                    <hr/>
                    <section>
                        <h2>Erledigt
                            <i onClick={this.toggleErledigtAufgeklappt} className="material-icons">{this.state.erledigtAufgeklappt ? "expand_less":"expand_more" }</i>
                        </h2>
                        <dl>
                            {this.state.erledigtAufgeklappt && App.gruppenListe.map(gruppe => (
                            <GruppenTag key={gruppe.id} gruppe={gruppe} setAktivGruppe={this.setAktivGruppe}
                                            erledigt={true}
                                            checkHandler={this.artikelChecken}/>
                            ))}
                        </dl>
                    </section>
                </main>
                <hr/>

                <nav>
                    <button onClick= {this.gruppenDialogOpen}><span
                      className="material-icons">bookmark_add</span>Gruppen</button>
                </nav>


                <GruppenDialog visible={this.state.showGruppenDialog}
                               gruppeHinzufuegen={App.gruppeHinzufuegen}
                               gruppenListe={App.gruppenListe}
                               onDialogClose={() => this.setState({showGruppenDialog: false})}/>
                
                
            </div>

        )
    }
}
