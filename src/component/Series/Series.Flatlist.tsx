import React from 'react'
import { 
    TouchableOpacity,
    FlatList, 
    ScrollView,
    View,
} from 'react-native';
import { SERVER } from '../../server.component';
import axios from 'axios';
import { Layout } from '@ui-kitten/components';

type Series_Item = {
    title: '',
    type: '',
    image: '',
    _id: ''
}

export const SeriesFlatlist = () => {
    const [content, setContent] = React.useState<Array<Series_Item>>([]);

    React.useEffect(() => {
        InitSeries();
    }, []);

    async function InitSeries() {
        var Content = await axios.get(SERVER + '/api/main-tours');
        setContent(Content.data);
    }

    const renderTour = ({ content }) => (
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            margin: 15,
          }}
        >
          <TouchableOpacity>
            <View style={{ justifyContent: "center", alignItems: "center" }}>
              <Image source={{ url: content.banner }} />
            </View>
          </TouchableOpacity>
        </View>
      );


    return (
        <div>
            <Layout>
                <FlatList
                data={renderTour}
                renderItem={renderTour}
                style={{ margin: 20 }}
                numColumns={4}
                />
            </Layout>
        </div>
    )
}


