import { FontAwesome } from "@expo/vector-icons";
import { router } from "expo-router";
import { SafeAreaView, TouchableOpacity, View } from "react-native";
import { lightestGray, midLightGray } from "./Styles/Colors";
import { H2 } from "./Typography/Typography";
import { ScaledSheet } from "react-native-size-matters";

interface HeaderProps {
  options: {
    title?: string;
  };
}

const TabHeader = ({ options }: HeaderProps) => {
  if (!options.title) return;
  return (
    <SafeAreaView style={{ backgroundColor: lightestGray }}>
      <TouchableOpacity style={styles.tabHeader} onPress={() => router.back()}>
        {router.canGoBack() && (
          <View style={styles.icon}>
            <FontAwesome color={midLightGray} name="chevron-left" size={10} />
          </View>
        )}
        <H2 color="midLightGray" text={options.title} />
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default TabHeader;

const styles = ScaledSheet.create({
  tabHeader: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    marginBottom: 12,
  },
  icon: {
    borderColor: midLightGray,
    borderRadius: "45@s",
    borderWidth: "1@s",
    padding: "6@s",
    marginHorizontal: "10@s",
  },
});
