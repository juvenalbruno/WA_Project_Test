//Pedidos
import { Card, CardContent, InputLabel, MenuItem, Select, Typography, FormControl, Button, TableRow, TableCell } from '@material-ui/core';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

import React, { memo, Fragment, useState, useEffect, FormEvent } from 'react';
import { useHistory } from 'react-router-dom';
import Toolbar from 'components/Layout/Toolbar';
import Axios from 'axios';

const HOST = process.env.REACT_APP_API_PEDIDO;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
      maxWidth: 300,
      marginBottom: 15,
    },
    Cards: {
        marginTop: 15,
    },
    button: {
        margin: theme.spacing(1),
    },
    CardContent: {
        display: 'flex',
        justifyContent: 'center',
        textAlign: 'center',     
        borderBottom: '1px solid #00000037'   
    },

    Subtitle: {
        width: 155,
    },

    TableResults: {
        display: 'flex',
        justifyContent: 'center',
    },

    TableRow: {
        display: 'felx',
        alignItems: 'center',
        textAlign: 'center',
        width: 155,
    },
  }),
);

const CreatePedido = memo((props: {}) => {

    const classes = useStyles();
    const history = useHistory();
    
    const [Notebook, setNotebook] = useState('');
    const [Cor, setCor] = useState('');
    const [Valor, setValor] = useState('R$ 0,00');
    const [Quantidade, setQuantidade] = useState('');
    const [ValorTemp, setValorTemp] = useState<number>(0);
    const [results, setResults] = useState([]);
        
    useEffect(() => {
        handleGet();
    },[])

    useEffect(() => { 
        var Temp = ValorTemp.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
        
        { Quantidade && setValor(Temp)}
        
        { Notebook == 'Dell G3 - 3500' && setValorTemp(Quantidade * 5000) }
        { Notebook == 'Dell Alienware M15' && setValorTemp(Quantidade * 16000) }
        { Notebook == 'Samsung Odyssey  Gamer' && setValorTemp(Quantidade * 45000) }
        { Notebook == 'Acer Nitro 5' && setValorTemp(Quantidade * 8000) }
    })


    async function handleSubmit(event: FormEvent){
        event.preventDefault();

        const Data = {
            Notebook,
            Cor,
            Quantidade,
            Valor
        }
        
        await Axios.post(HOST, Data);

        alert('Compra bem sucedida. Obrigado!');
        history.go(0);
    }

    async function handleGet(){
        const result = await Axios.get(HOST);
        setResults(result.data);
    }
    
    return(
        <Fragment>
            <Toolbar title='Criando Pedido' />

            <Card>
                <CardContent>
                    <Typography variant='subtitle1' gutterBottom>Faça seu pedido:</Typography>

                        <FormControl className={classes.formControl}>
                            <InputLabel id="label">Notebook</InputLabel>
                            <Select labelId="label" id="select" value={Notebook} onClick={(event) => setNotebook(event.target.value)}>
                                <MenuItem value="Dell G3 - 3500">Dell G3 - 3500</MenuItem>
                                <MenuItem value="Dell Alienware M15">Dell Alienware M15</MenuItem>
                                <MenuItem value="Samsung Odyssey  Gamer">Samsung Odyssey  Gamer</MenuItem>
                                <MenuItem value="Acer Nitro 5">Acer Nitro 5</MenuItem>
                            </Select>
                        </FormControl>
                        
                        <FormControl className={classes.formControl}>
                            <InputLabel id="label">Cor</InputLabel>
                            <Select labelId="label" id="select" value={Cor} onClick={(event) => setCor(event.target.value)}>
                                <MenuItem value="Preto">Preto</MenuItem>
                                <MenuItem value="Branco">Branco</MenuItem>
                                <MenuItem value="Prata">Prata</MenuItem>
                            </Select>
                        </FormControl>
                        
                        <FormControl className={classes.formControl}>
                            <InputLabel id="label">Quantidade</InputLabel>
                            <Select labelId="label" id="select" value={Quantidade} onClick={(event) => setQuantidade(event.target.value)}>
                                <MenuItem value="1">1</MenuItem>
                                <MenuItem value="2">2</MenuItem>
                                <MenuItem value="3">3</MenuItem>
                                <MenuItem value="4">4</MenuItem>
                                <MenuItem value="5">5</MenuItem>
                                <MenuItem value="6">6</MenuItem>
                                <MenuItem value="7">7</MenuItem>
                                <MenuItem value="8">8</MenuItem>
                                <MenuItem value="9">9</MenuItem>
                                <MenuItem value="10">10</MenuItem>
                            </Select>
                        </FormControl>
                        
                        <Typography variant='h6' >TOTAL: {Valor}</Typography>

                        <Button 
                            variant="contained"
                            color="primary"
                            className={classes.button}
                            onClick={handleSubmit}
                        >
                            Comprar
                        </Button>

                </CardContent>
            </Card>
            
            <Card className={classes.Cards}>
                <CardContent>
                    <Typography variant='subtitle1' gutterBottom>Lista de Pedidos:</Typography>
                </CardContent>
                <CardContent className={classes.CardContent}>
                    <Typography variant='subtitle1'className={classes.Subtitle}>Notebook</Typography>
                    <Typography variant='subtitle1'className={classes.Subtitle}>Cor</Typography>
                    <Typography variant='subtitle1'className={classes.Subtitle}>Quantidade</Typography>
                    <Typography variant='subtitle1'className={classes.Subtitle}>Valor</Typography>
                </CardContent>
                <CardContent>
                    {results.map(Data => (              
                        <TableRow className={classes.TableResults}>
                            <TableCell className={classes.TableRow}>{Data.Notebook}</TableCell>
                            <TableCell className={classes.TableRow}>{Data.Cor}</TableCell>
                            <TableCell className={classes.TableRow}>{Data.Quantidade}</TableCell>
                            <TableCell className={classes.TableRow}>{Data.Valor}</TableCell>
                        </TableRow>
                    ))}
                </CardContent>
            </Card>
        </Fragment>
    );
});

export default CreatePedido;