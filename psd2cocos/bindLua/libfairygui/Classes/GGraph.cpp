#include "GGraph.h"
#include "utils/ToolSet.h"

NS_FGUI_BEGIN
USING_NS_CC;

GGraph::GGraph() :
    _shape(nullptr),
    _type(0),
    _lineSize(1),
    _lineColor(Color4F::BLACK),
    _fillColor(Color4F::WHITE)
{
    _touchDisabled = true;
}

GGraph::~GGraph()
{
}

void GGraph::handleInit()
{
    _shape = DrawNode::create();
    _shape->retain();

    _displayObject = _shape;
}

void GGraph::drawRect(float aWidth, float aHeight, int lineSize, const cocos2d::Color4F& lineColor, const cocos2d::Color4F& fillColor)
{
    _type = 0; //avoid updateshape call in handleSizeChange
    setSize(aWidth, aHeight);
    _type = 1;
    _lineSize = lineSize;
    _lineColor = lineColor;
    _fillColor = fillColor;
    updateShape();
}

void GGraph::drawEllipse(float aWidth, float aHeight, int lineSize, const cocos2d::Color4F& lineColor, const cocos2d::Color4F& fillColor)
{
    _type = 0; //avoid updateshape call in handleSizeChange
    setSize(aWidth, aHeight);
    _type = 2;
    _lineSize = lineSize;
    _lineColor = lineColor;
    _fillColor = fillColor;
    updateShape();
}

void GGraph::updateShape()
{
    _shape->clear();
    if (_type == 1)
    {
        if (_lineSize > 0)
        {
            _shape->setLineWidth(_lineSize);
            _shape->drawRect(Vec2::ZERO, _size, _lineColor);
        }
        _shape->drawSolidRect(Vec2::ZERO, _size, _fillColor);
        _touchDisabled = false;
    }
    else if (_type == 2)
    {
        if (_lineSize > 0)
        {
            _shape->setLineWidth(_lineSize);
            _shape->drawCircle(Vec2(_size.width / 2, _size.height / 2), _size.width / 2, 0, 360, false, 1, _size.height / _size.width, _lineColor);
        }
        _shape->drawSolidCircle(Vec2(_size.width / 2, _size.height / 2), _size.width / 2, 0, 360, 1, _size.height / _size.width, _fillColor);
        _touchDisabled = false;
    }
    else
        _touchDisabled = true;
}

cocos2d::Color4B GGraph::cg_getColor() const
{
    return (Color4B)_fillColor;
}

void GGraph::cg_setColor(const cocos2d::Color4B& value)
{
    _fillColor = (Color4F)value;
    updateShape();
}

void GGraph::handleSizeChanged()
{
    GObject::handleSizeChanged();

    updateShape();
}

void GGraph::setup_BeforeAdd(TXMLElement * xml)
{
    GObject::setup_BeforeAdd(xml);

    const char* p = xml->Attribute("type");
    if (p)
    {
        if (strcmp(p, "rect") == 0)
            _type = 1;
        else if (strcmp(p, "eclipse") == 0)
            _type = 2;
    }

    if (_type != 0)
    {
        p = xml->Attribute("lineSize");
        if (p)
            _lineSize = atoi(p);

        p = xml->Attribute("lineColor");
        if (p)
            _lineColor = (Color4F)ToolSet::convertFromHtmlColor(p);

        p = xml->Attribute("fillColor");
        if (p)
            _fillColor = (Color4F)ToolSet::convertFromHtmlColor(p);

        updateShape();
    }
}

NS_FGUI_END