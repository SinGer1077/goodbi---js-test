import React, {useEffect,useState} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import TextField from '@material-ui/core/TextField'
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardHeader from "@material-ui/core/CardHeader"


const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    appBackground: {
        backgroundColor: '#f5f5f5',
        minHeight: '100vh'
    },
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
    },
    drawerHeader: {
        display: 'flex',
        alignItems: 'center',
        padding: theme.spacing(1, 2),
        ...theme.mixins.toolbar,
        justifyContent: 'flex-end',
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
    },

    cardPage: {
        maxWidth: 500
    },

    formPage: {
        margin: theme.spacing(1),
    },

    formInput:{
        width: '100%'
    }
}));


function App() {
    const classes = useStyles();
    const [name,setName] = useState('');
    const [fullName,setFullName] = useState('');
    const [sex, setSex] = useState('');
    const [genderText,setText] = useState('Неопределён');
    const [card, setCard] = useState(true);
    const updateName = e => {
        setName(e.target.value);
    }
    const getName = e =>{
        e.preventDefault();
        setFullName(name);
        setCard(false);
    }
    useEffect(()=>{
        getInput();
        }, [fullName, sex]);
    const getGender = gender =>{
        setSex(gender);
    }
    const getInput = async () => {
        const response = await fetch(
            'https://api.genderize.io?name='+fullName
        );
        const data = await response.json();
        getGender(data.gender);
        if (sex=='male')
            setText('Мужчина')
        if (sex=='female')
            setText('Женщина')
        if (sex==null)
            setText('Неопределён')
    };

    return (
        <div className={classes.appBackground}>
            <AppBar position="fixed" className={classes.appBar}>
                <Toolbar>
                    <Typography variant="h6" noWrap>
                        Узнай пол по имени
                    </Typography>
                </Toolbar>
            </AppBar>
            <main>
                <div className={classes.drawerHeader}/>
                <Container>
                    <Card className={classes.cardPage}>
                        <form className={classes.formPage} noValidate autoComplete="off">
                            <CardContent>
                                <TextField className={classes.formInput} id="filled-basic"
                                           label="Введи свое транслитерированое имя (Латиницей)" variant="filled"
                                onChange = {updateName}/>
                            </CardContent>
                            <CardActions>
                                <Button onClick={getName} variant="contained" color="primary">
                                    Узнать пол
                                </Button>
                            </CardActions>
                        </form>
                    </Card>
                </Container>
                <div className={classes.drawerHeader}/>
                <Container className={classes.root} >
                    <Card className={classes.cardPage} hidden={card}>
                        <CardContent>
                            <CardHeader title={genderText}/>
                        </CardContent>
                    </Card>
                </Container>

            </main>
        </div>
    );
}

export default App;
