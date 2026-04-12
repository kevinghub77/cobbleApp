import { Tabs } from 'expo-router';
import { View, Text, StyleSheet, Image } from 'react-native';
import { COLORS, FONT } from '../../constants/theme';

const SHEET_W = 1364;
const SHEET_H = 1364;
const CELL_W = 1364 / 2;
const CELL_H = 1364 / 3;
const DISPLAY = 28;
const SCALE = DISPLAY / CELL_H;
const SCALED_CELL_W = CELL_W * SCALE;
const SCALED_CELL_H = CELL_H * SCALE;

function TabIcon({ col, row, label, focused }: { col: number; row: number; label: string; focused: boolean }) {
  const leftOffset = -(col * SCALED_CELL_W) - (SCALED_CELL_W - DISPLAY) / 2;
  const topOffset = -(row * SCALED_CELL_H);

  return (
    <View style={styles.tabIcon}>
      <View style={[styles.iconBox, focused && styles.iconBoxActive]}>
        <View style={styles.spriteContainer}>
          <Image
            source={require('../../assets/icons.png')}
            style={{
              width: SHEET_W * SCALE,
              height: SHEET_H * SCALE,
              position: 'absolute',
              left: leftOffset,
              top: topOffset,
            }}
            resizeMode="contain"
          />
        </View>
      </View>
      <Text style={[styles.label, focused && styles.labelActive]}>{label}</Text>
    </View>
  );
}

export default function OrgLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: styles.tabBar,
        tabBarShowLabel: false,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          tabBarIcon: ({ focused }) => (
            <TabIcon col={0} row={0} label="Dashboard" focused={focused} />
          ),
        }}
      />
      <Tabs.Screen
        name="map"
        options={{
          tabBarIcon: ({ focused }) => (
            <TabIcon col={1} row={0} label="Map" focused={focused} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          tabBarIcon: ({ focused }) => (
            <TabIcon col={0} row={1} label="Org" focused={focused} />
          ),
        }}
      />
      <Tabs.Screen
        name="leaders"
        options={{
          tabBarIcon: ({ focused }) => (
            <TabIcon col={1} row={1} label="Leaders" focused={focused} />
          ),
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: COLORS.greenDark,
    borderTopWidth: 0,
    height: 80,
    paddingBottom: 12,
    paddingTop: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 10,
  },
  tabIcon: { alignItems: 'center', gap: 4 },
  iconBox: {
    width: 36,
    height: 36,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },
  iconBoxActive: {
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.3)',
  },
  spriteContainer: {
    width: DISPLAY,
    height: DISPLAY,
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: { fontFamily: FONT.medium, fontSize: 10, color: 'rgba(255,255,255,0.5)' },
  labelActive: { color: COLORS.white },
});
