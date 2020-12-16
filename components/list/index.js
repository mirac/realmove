import React from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "../../utils/Axios.js";
import BottomBar from "../bottom-bar";
import Loading from "../loading/index.js";
import Toast from "../toast";
import TopNavigation from "../top-navigation";
import { Button, List as UIList, ListItem, Text } from "@ui-kitten/components";
import { Image, RefreshControl, StyleSheet, View } from "react-native";

class List extends React.Component {
	constructor() {
		super();
		this.state = {
			advert_list: [],
			loading: false
		}
	}

	componentDidMount(){
		this.requestAdverts();
	}

	renderItemLeft = (advert_pictures) => () => (
		<Image
			source={{ uri: advert_pictures[0] }}
			style={CSS.property_image}
		/>
	);
	
	renderItemRight = (id) => () => (
		<Button onPress={() => this.props.navigation.navigate("AdvertDetails", { id })} size="small">Gözat</Button>
	);

	requestAdverts = () => {
		this.setState({ loading: true }, async() => {
			axios.get("/adverts-ws/api/advert/all", {
				headers: { "Authorization": `Bearer ${await AsyncStorage.getItem("@token")}`}
			})
			.then((response) => {
				this.setState({ advert_list: response.data });
			})
			.catch(() => {
				Toast.error("Sunucuya bağlanırken hata ile karşılaşıldı!");
			})
			.finally(() => { this.setState({ loading: false }); });
		});
	}

	render() {
		return (
			<Loading loading={this.state.loading}>
				<View style={CSS.list}>
					<TopNavigation title="Vitrin" navigation={this.props.navigation} />

					<UIList
						data={this.state.advert_list}
						refreshControl={<RefreshControl onRefresh={this.requestAdverts} />}
						renderItem={({ item }) => {
							return <ListItem
								accessoryLeft={this.renderItemLeft(item.advertPictures)}
								accessoryRight={this.renderItemRight(item.advertId)}
								description=
								{<View>
									<Text appearance="hint" category="p2">{item.description}</Text>
									<Text appearance="hint" category="p2">{item.city} - {item.district}</Text>
									<Text appearance="hint" category="p2">{item.advertType} - {item.price}₺</Text>
								</View>}
								title={item.title}
							/>
						}}
					/>

					<BottomBar index={0} navigation={this.props.navigation} />
				</View>
			</Loading>
		);
	}
}

const CSS = StyleSheet.create({
	list: {
		height: "100%"
	},
	property_image: {
		height: 75,
		width: 75
	}
});

export default List;