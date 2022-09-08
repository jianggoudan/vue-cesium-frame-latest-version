/**
 * 初始化地图以及地图工具功能
 */
import * as Cesium from 'cesium';
import 'cesium/Source/Widgets/widgets.css';

var positions1 = [];
var poly = null;
var distance = 0;
var cartesian = null;
var floatingPoint = [];
var options;
var optionsEntity;



var positions2 = [];
var polygon = null;
var tempPoints = [];
var cartesian2 = null;
var areaPoint = [];
var areaMeasure;
export default {

    data() {
        return {
            viewer: null,
            isMeasureingDistance: false,
            isMeasureingArea: false,
        }
    },
    mounted() {
        this.mapInit()
    },
    methods: {
        //初始化地图
        mapInit() {
            Cesium.Ion.defaultAccessToken = window.CESIUM_TOKEN;
            this.viewer = new Cesium.Viewer('map', {
                terrainProvider: Cesium.createWorldTerrain(),
                scene3DOnly: true,
                 baseLayerPicker:true,
                animation: false,
                timeline: false,
                geocoder: false,
                homeButton: false,
                navtrueigationHelpButton: false,
                infoBox: false,
                selectionIndicator: false,//去除自带绿色选择框

                navigationHelpButton: false,
                fullscreenButton: false,
            });
            this.viewer.cesiumWidget.creditContainer.style.display = "none";//去掉logo
        },
        //缩小按钮
        zoomIn() {
            this.viewer?.camera.moveBackward(1000000)
        },
        //放大按钮
        zoomOut() {
            this.viewer?.camera.moveForward(1000000)
        },

        clearDistance() {

            for (const i of floatingPoint) {
                this.viewer.entities.remove(i)
            }
            this.viewer.entities.remove(optionsEntity)

        },
        clearArea() {
            for (const i of areaPoint) {
                this.viewer.entities.remove(i)
            }
            // this.viewer.entities.remove(polygon)
            this.viewer.entities.remove(areaMeasure)

        },
        distance() {

            this.isMeasureingDistance = !this.isMeasureingDistance
            if (this.isMeasureingDistance) {

                this.measureLineSpace(this.viewer)
            } else {//再次点击按钮清除线
                this.clearDistance()
                this.resetDistance()
            }

        },
        area() {

            this.isMeasureingArea = !this.isMeasureingArea
            if (this.isMeasureingArea) {

                this.measurePolygn(this.viewer)
            } else {
                this.clearArea()
                this.resetArea()

            }

        },
        // 重置测距参数
        resetDistance(){
             positions1 = [];
             poly = null;
             distance = 0;
             cartesian = null;
             floatingPoint = [];
             options=null;
             optionsEntity=null;
        },
        // 重置测面参数
        resetArea(){
             positions2 = [];
             polygon = null;
             tempPoints = [];
             cartesian2 = null;
             areaPoint = [];
             areaMeasure=null;
        },
        //测距
        measureLineSpace(viewer) {
            // 取消双击事件-追踪该位置
            viewer.cesiumWidget.screenSpaceEventHandler.removeInputAction(Cesium.ScreenSpaceEventType.LEFT_DOUBLE_CLICK);

            let handler = new Cesium.ScreenSpaceEventHandler(viewer.scene._imageryLayerCollection);

            // tooltip.style.display = "block";

            handler.setInputAction(function (movement) {
                // tooltip.style.left = movement.endPosition.x + 3 + "px";
                // tooltip.style.top = movement.endPosition.y - 25 + "px";
                // tooltip.innerHTML = '<p>单击开始，右击结束</p>';
                // cartesian = viewer.scene.pickPosition(movement.endPosition);
                let ray = viewer.camera.getPickRay(movement.endPosition);
                cartesian = viewer.scene.globe.pick(ray, viewer.scene);
                //cartesian = viewer.scene.camera.pickEllipsoid(movement.endPosition, viewer.scene.globe.ellipsoid);
                if (positions1.length >= 2) {
                    if (!Cesium.defined(poly)) {
                        poly = new PolyLinePrimitive(positions1);
                    } else {
                        positions1.pop();
                        // cartesian.y += (1 + Math.random());
                        positions1.push(cartesian);
                    }
                    distance = getSpaceDistance(positions1);
                    // console.log("distance: " + distance);
                    // tooltip.innerHTML='<p>'+distance+'米</p>';
                }
            }, Cesium.ScreenSpaceEventType.MOUSE_MOVE);

            handler.setInputAction(function (movement) {
                // tooltip.style.display = "none";
                // cartesian = viewer.scene.camera.pickEllipsoid(movement.position, viewer.scene.globe.ellipsoid);
                // cartesian = viewer.scene.pickPosition(movement.position);
                let ray = viewer.camera.getPickRay(movement.position);
                cartesian = viewer.scene.globe.pick(ray, viewer.scene);
                if (positions1.length == 0) {
                    positions1.push(cartesian.clone());
                }
                positions1.push(cartesian);
                //在三维场景中添加Label
                //   var cartographic = Cesium.Cartographic.fromCartesian(cartesian);
                var textDisance = distance + "米";
                // console.log(textDisance + ",lng:" + cartographic.longitude/Math.PI*180.0);
                // floatingPoint = viewer.entities.add({
                floatingPoint.push(viewer.entities.add({
                    name: '空间直线距离',
                    // position: Cesium.Cartesian3.fromDegrees(cartographic.longitude / Math.PI * 180, cartographic.latitude / Math.PI * 180,cartographic.height),
                    position: positions1[positions1.length - 1],
                    point: {
                        pixelSize: 5,
                        color: Cesium.Color.RED,
                        outlineColor: Cesium.Color.WHITE,
                        outlineWidth: 2,
                    },
                    label: {
                        text: textDisance,
                        font: '18px sans-serif',
                        fillColor: Cesium.Color.GOLD,
                        style: Cesium.LabelStyle.FILL_AND_OUTLINE,
                        outlineWidth: 2,
                        verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
                        pixelOffset: new Cesium.Cartesian2(20, -20),
                    }
                }));
            }, Cesium.ScreenSpaceEventType.LEFT_CLICK);

            handler.setInputAction(function (movement) {
                handler.destroy(); //关闭事件句柄
                positions1.pop(); //最后一个点无效


            }, Cesium.ScreenSpaceEventType.RIGHT_CLICK);

            var PolyLinePrimitive = (function () {
                function _(positions1) {
                    options = {
                        name: '直线',
                        id: 'zhixian',
                        polyline: {
                            show: true,
                            positions: [],
                            material: Cesium.Color.CHARTREUSE,
                            width: 10,
                            clampToGround: true
                        }
                    };
                    this.positions = positions1;
                    this._init();
                }

                _.prototype._init = function () {
                    var _self = this;
                    var _update = function () {
                        return _self.positions;
                    };
                    //实时更新polyline.positions
                    options.polyline.positions = new Cesium.CallbackProperty(_update, false);
                    optionsEntity = viewer.entities.add(options);
                };

                return _;
            })();

            //空间两点距离计算函数
            function getSpaceDistance(positions1) {
                var distance = 0;
                for (var i = 0; i < positions1.length - 1; i++) {

                    var point1cartographic = Cesium.Cartographic.fromCartesian(positions1[i]);
                    var point2cartographic = Cesium.Cartographic.fromCartesian(positions1[i + 1]);
                    /**根据经纬度计算出距离**/
                    var geodesic = new Cesium.EllipsoidGeodesic();
                    geodesic.setEndPoints(point1cartographic, point2cartographic);
                    var s = geodesic.surfaceDistance;
                    //console.log(Math.sqrt(Math.pow(distance, 2) + Math.pow(endheight, 2)));
                    //返回两点之间的距离
                    s = Math.sqrt(Math.pow(s, 2) + Math.pow(point2cartographic.height - point1cartographic.height, 2));
                    distance = distance + s;
                }
                return distance.toFixed(2);
            }
        },
        //测面
        measurePolygn(viewer) {
            // 鼠标事件
            var handler = new Cesium.ScreenSpaceEventHandler(viewer.scene._imageryLayerCollection);

            handler.setInputAction(function (movement) {
                let ray = viewer.camera.getPickRay(movement.endPosition);
                cartesian2 = viewer.scene.globe.pick(ray, viewer.scene);
                positions2.pop();//移除最后一个
                positions2.push(cartesian2);
                if (positions2.length >= 2) {
                    var dynamicPositions = new Cesium.CallbackProperty(function () {
                        return new Cesium.PolygonHierarchy(positions2);
                        return positions2;
                    }, false);
                    polygon = PolygonPrimitive(dynamicPositions);
                }
            }, Cesium.ScreenSpaceEventType.MOUSE_MOVE);

            handler.setInputAction(function (movement) {
                let ray = viewer.camera.getPickRay(movement.position);
                cartesian2 = viewer.scene.globe.pick(ray, viewer.scene);
                if (positions2.length == 0) {
                    positions2.push(cartesian2.clone());
                }
                positions2.push(cartesian2);
                //在三维场景中添加点
                var cartographic = Cesium.Cartographic.fromCartesian(positions2[positions2.length - 1]);
                var longitudeString = Cesium.Math.toDegrees(cartographic.longitude);
                var latitudeString = Cesium.Math.toDegrees(cartographic.latitude);
                var heightString = cartographic.height;
                var labelText = "(" + longitudeString.toFixed(2) + "," + latitudeString.toFixed(2) + ")";
                tempPoints.push({lon: longitudeString, lat: latitudeString, hei: heightString});
                areaPoint.push(viewer.entities.add({
                    name: '多边形面积',
                    position: positions2[positions2.length - 1],
                    point: {
                        pixelSize: 5,
                        color: Cesium.Color.RED,
                        outlineColor: Cesium.Color.WHITE,
                        outlineWidth: 2,
                        heightReference: Cesium.HeightReference.CLAMP_TO_GROUND
                    },
                    // label: {
                    //     text: labelText,
                    //     font: '18px sans-serif',
                    //     fillColor: Cesium.Color.GOLD,
                    //     style: Cesium.LabelStyle.FILL_AND_OUTLINE,
                    //     outlineWidth: 2,
                    //     verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
                    //     pixelOffset: new Cesium.Cartesian2(20, -20),
                    // }
                }));
            }, Cesium.ScreenSpaceEventType.LEFT_CLICK);
            handler.setInputAction(function (movement) {
                handler.destroy();
                positions2.pop();
                var textArea = getArea(tempPoints) + "平方公里";
                areaMeasure = viewer.entities.add({
                    name: '多边形面积',
                    position: positions2[positions2.length - 1],
                    label: {
                        text: textArea,
                        font: '18px sans-serif',
                        fillColor: Cesium.Color.GOLD,
                        style: Cesium.LabelStyle.FILL_AND_OUTLINE,
                        outlineWidth: 2,
                        verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
                        pixelOffset: new Cesium.Cartesian2(20, -40),
                        heightReference: Cesium.HeightReference.CLAMP_TO_GROUND
                    }
                });
            }, Cesium.ScreenSpaceEventType.RIGHT_CLICK);
            var radiansPerDegree = Math.PI / 180.0;//角度转化为弧度(rad)
            var degreesPerRadian = 180.0 / Math.PI;//弧度转化为角度
            //计算多边形面积
            function getArea(points) {
                var res = 0;
                //拆分三角曲面
                for (var i = 0; i < points.length - 2; i++) {
                    var j = (i + 1) % points.length;
                    var k = (i + 2) % points.length;
                    var totalAngle = Angle(points[i], points[j], points[k]);
                    var dis_temp1 = distance(positions2[i], positions2[j]);
                    var dis_temp2 = distance(positions2[j], positions2[k]);
                    res += dis_temp1 * dis_temp2 * Math.abs(Math.sin(totalAngle));
                }
                return (res / 1000000.0).toFixed(4)/2;
            }

            /*角度*/
            function Angle(p1, p2, p3) {
                var bearing21 = Bearing(p2, p1);
                var bearing23 = Bearing(p2, p3);
                var angle = bearing21 - bearing23;
                if (angle < 0) {
                    angle += 360;
                }
                return angle;
            }

            /*方向*/
            function Bearing(from, to) {
                var lat1 = from.lat * radiansPerDegree;
                var lon1 = from.lon * radiansPerDegree;
                var lat2 = to.lat * radiansPerDegree;
                var lon2 = to.lon * radiansPerDegree;
                var angle = -Math.atan2(Math.sin(lon1 - lon2) * Math.cos(lat2), Math.cos(lat1) * Math.sin(lat2) - Math.sin(lat1) * Math.cos(lat2) * Math.cos(lon1 - lon2));
                if (angle < 0) {
                    angle += Math.PI * 2.0;
                }
                angle = angle * degreesPerRadian;//角度
                return angle;
            }

            function PolygonPrimitive(positions2) {
                polygon = viewer.entities.add({
                    polygon: {
                        hierarchy: positions2,
                        material: Cesium.Color.GREEN.withAlpha(0.1),
                    }
                });

            }

            function distance(point1, point2) {
                var point1cartographic = Cesium.Cartographic.fromCartesian(point1);
                var point2cartographic = Cesium.Cartographic.fromCartesian(point2);
                /**根据经纬度计算出距离**/
                var geodesic = new Cesium.EllipsoidGeodesic();
                geodesic.setEndPoints(point1cartographic, point2cartographic);
                var s = geodesic.surfaceDistance;
                //返回两点之间的距离
                s = Math.sqrt(Math.pow(s, 2) + Math.pow(point2cartographic.height - point1cartographic.height, 2));
                return s;
            }
        }
    },
}
