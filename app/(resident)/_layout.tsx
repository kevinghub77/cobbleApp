import { Tabs, router } from 'expo-router';
import { useEffect } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { COLORS, FONT } from '../../constants/theme';
import { useApp } from '../../context/AppContext';

// Spritesheet is 2 cols x 3 rows, each cell ~512x512 in a 1024x1536 image
// Row 0: map (0,0), feed/quests board (0,1)
// Row 1: create plus (1,0), sidequest lightning (1,1)
// Row 2: trophy (2,0), profile knight (2,1)
const SHEET_W = 1364;
const SHEET_H = 1364;
const CELL_W = 1364 / 2;
const CELL_H = 1364 / 3;
const DISPLAY = 30;
const SCALE = DISPLAY / CELL_H;
const SCALED_CELL_W = CELL_W * SCALE;
const SCALED_CELL_H = CELL_H * SCALE;

type SpriteId = 'map' | 'feed' | 'create' | 'quest' | 'leaders' | 'profile';

const SPRITE_COORDS: Record<SpriteId, { col: number; row: number }> = {
  map:     { col: 0, row: 0 },
  feed:    { col: 1, row: 0 },
  create:  { col: 0, row: 1 },
  quest:   { col: 1, row: 1 },
  leaders: { col: 0, row: 2 },
  profile: { col: 1, row: 2 },
};

function SpriteIcon({ id, label, focused }: { id: SpriteId; label: string; focused: boolean }) {
  const { col, row } = SPRITE_COORDS[id];
  
  const leftOffset = -(col * SCALED_CELL_W) - (SCALED_CELL_W - DISPLAY) / 2;
  const topOffset = -(row * SCALED_CELL_H);
  
  return (
    <View style={iconStyles.wrap}>
      <View style={[iconStyles.iconBox, focused && iconStyles.iconBoxFocused]}>
        <View style={{ width: DISPLAY, height: DISPLAY, overflow: 'hidden', alignItems: 'center', justifyContent: 'center' }}>
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
      <Text style={[iconStyles.label, focused && iconStyles.labelFocused]}>{label}</Text>
    </View>
  );
}

const iconStyles = StyleSheet.create({
  wrap: { alignItems: 'center', justifyContent: 'center', gap: 3 },
  iconBox: {
    width: 38,
    height: 38,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },
  iconBoxFocused: {
    backgroundColor: 'rgba(72, 201, 176, 0.15)',
    borderWidth: 1,
    borderColor: '#48C9B0',
  },
  label: {
    fontFamily: FONT.pixel,
    fontSize: 6,
    color: '#4A6357',
    letterSpacing: 0,
    width: 60,
    textAlign: 'center',
  },
  labelFocused: {
    color: '#48C9B0',
  },
});

export default function ResidentLayout() {
  const { userRole } = useApp();

  useEffect(() => {
    if (userRole === null) {
      router.replace('/');
    }
  }, [userRole]);

  return (
    <View style={{ flex: 1 }}>
      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarStyle: styles.tabBar,
          tabBarShowLabel: false,
          tabBarHideOnKeyboard: true,
        }}
      >
        <Tabs.Screen
          name="index"
          options={{ tabBarIcon: ({ focused }) => <SpriteIcon id="map" label="MAP" focused={focused} /> }}
        />
        <Tabs.Screen
          name="feed"
          options={{ tabBarIcon: ({ focused }) => <SpriteIcon id="feed" label="FEED" focused={focused} /> }}
        />
        <Tabs.Screen
          name="create"
          options={{
            href: null,
          }}
        />
        <Tabs.Screen
          name="sidequests"
          options={{ tabBarIcon: ({ focused }) => <SpriteIcon id="quest" label="QUESTS" focused={focused} /> }}
        />
        <Tabs.Screen
          name="leaders"
          options={{ tabBarIcon: ({ focused }) => <SpriteIcon id="leaders" label="RANKS" focused={focused} /> }}
        />
        <Tabs.Screen
          name="profile"
          options={{ tabBarIcon: ({ focused }) => <SpriteIcon id="profile" label="HERO" focused={focused} /> }}
        />
      </Tabs>

      <TouchableOpacity 
        style={styles.floatingCreateBtn}
        activeOpacity={0.9}
        onPress={() => router.push('/(resident)/create')}
      >
        <Image 
          source={require('../../assets/upload.png')} 
          style={{ width: 34, height: 34, resizeMode: 'contain' }} 
        />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: '#0D1710',
    borderTopWidth: 1,
    borderTopColor: '#1E3A2A',
    height: 82,
    paddingBottom: 12,
    paddingTop: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.5,
    shadowRadius: 10,
    elevation: 20,
  },
  floatingCreateBtn: {
    position: 'absolute',
    bottom: 95,
    alignSelf: 'center',
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#162212',
    borderWidth: 2,
    borderColor: '#48C9B0',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#48C9B0',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.4,
    shadowRadius: 8,
    elevation: 10,
    zIndex: 100,
  },
  createPlus: {
    fontSize: 26,
    color: '#48C9B0',
    fontFamily: FONT.pixel,
    lineHeight: 30,
  },
});
