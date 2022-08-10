import React, { useEffect, useState } from 'react'
import { Card, CardActions, CardContent, Button, Typography} from '@material-ui/core';
import { Box } from '@mui/material';
import './DeletarCategoria.css';
import { useNavigate, useParams } from 'react-router-dom';
import { buscaId, deleteId } from '../../../services/Service';
import Categoria from '../../../models/Categoria';
import { useSelector } from 'react-redux';
import { TokenState } from '../../../store/tokens/tokensReduce';


function DeletarCategoria() {
  let navigate = useNavigate();
  const { id } =  useParams<{id: string}>();
  const token = useSelector<TokenState, TokenState["tokens"]>(
    (state) => state.tokens
  );
  const [categorias, setCategoria] = useState<Categoria>()

  useEffect(()=>{
    if(token ===""){
        alert("Você precisa estar logado")
        navigate('/login')
    }
  }, [token])

  useEffect(()=>{
    if(id!== undefined){
        findById(id)
    }
  }, [id])
  async function findById(id: string){
    buscaId(`/categorias/${id}`, setCategoria,{
        headers: {
            'Authorization': token
        }
    })
  }

  function sim() {
    navigate('/categorias')
    deleteId(`/categorias/${id}`, {
      headers: {
        'Authorization': token
      }
    });
    alert('Tema deletado com sucesso');
  }

  function nao() {
    navigate('/categorias')
  }

          
  return (
    <>
      <Box m={2}>
        <Card variant="outlined">
          <CardContent>
            <Box justifyContent="center">
              <Typography color="textSecondary" gutterBottom>
                Deseja deletar a Categoria:
              </Typography>
              <Typography color="textSecondary">
                {categorias?.descricao}
              </Typography>
            </Box>
          </CardContent>
          <CardActions>
            <Box display="flex" justifyContent="start" ml={1.0} mb={2} >
              <Box mx={2}>
                <Button onClick={sim} variant="contained" className="marginLeft" size='large' color="primary">
                  Sim
                </Button>
              </Box>
              <Box mx={2}>
                <Button  onClick={nao} variant="contained" size='large' color="secondary">
                  Não
                </Button>
              </Box>
            </Box>
          </CardActions>
        </Card>
      </Box>
    </>
  );
}
export default DeletarCategoria;