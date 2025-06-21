import { useLayoutEffect, useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Pressable,
    ScrollView,
    Image,
    Modal,
    Share
} from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import { Entypo, AntDesign, Feather } from '@expo/vector-icons'

import { Ingredients } from '../../components/ingredients';
import { Instructions } from '../../components/instructions';
import { VideoView } from '../../components/video';

import { isFavorites, saveFavorites, removeItem } from '../../../utils/storage';

export function Detail() {

    const route = useRoute()
    const navigation = useNavigation()
    //console.log(route.params?.data)

    const [showVideo, setShowVideo] = useState(false)
    const [favorite, setFavorite] = useState(false)

    useLayoutEffect(() => {

        async function getSatusFavorites() {
            const receipeFavorite = await isFavorites(route.params?.data)
            setFavorite(receipeFavorite)
        }
        getSatusFavorites()

        navigation.setOptions({
            title: route.params?.data ? route.params?.data.name : 'Detalhes da receita',
            headerRight: () => (
                <Pressable onPress={() => handleFavoriteReceipe(route.params?.data)}>
                    {favorite ? (
                        <Entypo
                            name='heart'
                            size={28}
                            color='#ff4141'
                        />
                    ) : (
                        <Entypo
                            name='heart-outlined'
                            size={28}
                            color='#ff4141'
                        />
                    )}

                </Pressable>

            )
        })
    }, [navigation, route.params?.data, favorite])


    async function handleFavoriteReceipe(receipe) {
        if (favorite) {
            await removeItem(receipe.id)
            setFavorite(false)
        } else {
            await saveFavorites("@appreceitas", receipe)
            setFavorite(true)
        }
    }


    function handleOpenvideo() {
        setShowVideo(true)
    }

    async function shareReceipe() {
        //console.log("compartilhar")
        try {
            await Share.share({
                url: 'https://sujeitoprogramador.com',
                message: `Receita: ${route.params?.data.name}\nIngredientes: ${route.params?.data.total_ingredients}\nVi lá no app receita fácil`
            })
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 14 }} showsVerticalScrollIndicator={false}>
            <Pressable onPress={handleOpenvideo}>
                <View style={styles.playIcon}>
                    <AntDesign name='playcircleo' size={50} color='#fafafa' />
                </View>
                <Image
                    source={{ uri: route.params?.data.cover }}
                    style={styles.cover}
                />
            </Pressable>

            <View style={styles.headerDetails}>
                <View>
                    <Text style={styles.title}>{route.params?.data.name}</Text>
                    <Text style={styles.ingredientsText}>ingredientes ({route.params?.data.total_ingredients})</Text>
                </View>
                <Pressable onPress={shareReceipe}>
                    <Feather name='share-2' size={24} color='#121212' />
                </Pressable>
            </View>

            {route.params?.data.ingredients.map((item) => (
                <Ingredients key={item.id} data={item} />
            ))}

            <View style={styles.instructionsArea}>
                <Text style={styles.instructionsText}>Modo de preparo</Text>
                <Feather
                    name='arrow-down'
                    size={24}
                    color='#fff'
                />
            </View>

            {(route.params?.data?.instructions || []).map((item, index) => (
                <Instructions key={item.id} data={item} index={index} />
            ))}

            <Modal visible={showVideo} animationType='slide'>
                <VideoView
                    handleClose={() => setShowVideo(false)}
                    videoUrl={route.params?.data.video}
                />
            </Modal>

        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#f3f9ff',
        paddingTop: 14,
        paddingHorizontal: 14
    },
    cover: {
        height: 200,
        borderRadius: 14,
        width: '100%'
    },
    playIcon: {
        position: 'absolute',
        zIndex: 9,
        top: 0, left: 0, right: 0, bottom: 0,
        alignItems: 'center',
        justifyContent: 'center'
    },
    title: {
        fontSize: 18,
        marginTop: 14,
        fontWeight: 'bold',
        color: '#000',
        marginBottom: 4
    },
    ingredientsText: {
        marginBottom: 14,
        fontSize: 16
    },
    headerDetails: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 14
    },
    instructionsArea: {
        backgroundColor: '#4cbe6c',
        padding: 8,
        borderRadius: 4,
        marginBottom: 14,
        flexDirection: 'row',

    },
    instructionsText: {
        fontSize: 18,
        color: '#fff',
        fontWeight: 500,
        marginRight: 8
    }


})