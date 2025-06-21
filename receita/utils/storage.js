import AsyncStorage from "@react-native-async-storage/async-storage";

/*
    Buscar os favoritos
    Salvar um novo favorito
    Remover um favorito da lista

*/

export async function getFavorites(key) {
    const favorites = await AsyncStorage.getItem(key)
    return JSON.parse(favorites) || []
}

export async function saveFavorites(key, newItem) {
    let myFavorites = await getFavorites(key)

    //Verifica se o item já existe e desconsidera
    let hasItem = myFavorites.some( item => item.id === newItem.id )

    if(hasItem) {
        console.log("Esse item já está salvo na sua lista.")
        return
    }

    myFavorites.push(newItem)

    await AsyncStorage.setItem(key, JSON.stringify(myFavorites))
    console.log('Salvo com sucesso!')
}

export async function removeItem(id) {
    let receipes = await getFavorites("@appreceitas")

    let myFavorites = receipes.filter( item => {
        return (item.id !== id)
    } )

    await AsyncStorage.setItem("@appreceita", JSON.stringify(myFavorites))
    console.log('Item deletado com sucesso!')
    return myFavorites

}

export async function isFavorites(receipe) {
    //Verifica se já tem na lista esse item

    let myReceipes = await getFavorites("@appreceitas")
    const favorites = myReceipes.find( item => item.id === receipe.id )

    if(favorites) {
        return true
    }

    return false
}